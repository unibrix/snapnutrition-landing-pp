(function () {
    "use strict";

    var THEME_KEY = "snapnutrition_theme";
    var CONSENT_KEY = "snapnutrition_cookie_consent";
    var GA_ID = "G-JJFTFWZEQ2";
    // Cloudflare Web Analytics: cookieless, aggregate page-view counts that do
    // not depend on the consent banner. Paste the site token from the Cloudflare
    // dashboard (Web Analytics -> Add a site -> JS snippet) to switch it on; an
    // empty string keeps it off. Still skipped when Do Not Track is enabled.
    var CF_BEACON_TOKEN = "";
    var sessionConsent = null;

    // Regional consent (Google Consent Mode v2).
    // Inside the EEA, the UK and Switzerland analytics is opt-in: nothing from
    // Google loads until "Accept". Everywhere else it runs from the first page
    // view and the banner is an opt-out notice. The region is guessed from the
    // device time zone and languages, erring towards "European" when unsure.
    // Google's own region-scoped consent default, resolved from the network
    // location, denies analytics storage in those regions as a second guard.
    var EUROPEAN_REGIONS = [
        "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT",
        "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
        "IS", "LI", "NO", "GB", "CH"
    ];
    var EUROPEAN_LANGUAGES = [
        "de", "fr", "it", "nl", "pl", "sv", "da", "fi", "nb", "nn", "no", "cs", "sk", "hu", "ro",
        "bg", "el", "hr", "sl", "et", "lv", "lt", "mt", "ga", "is", "lb", "rm", "fo", "eu", "ca",
        "gl", "cy", "gd"
    ];
    var EUROPEAN_TIME_ZONES = [
        "Europe/", "Atlantic/Reykjavik", "Atlantic/Canary", "Atlantic/Madeira", "Atlantic/Azores",
        "Atlantic/Faroe", "Atlantic/Faeroe", "Atlantic/Jan_Mayen", "Arctic/Longyearbyen",
        "Indian/Reunion", "Indian/Mayotte", "America/Martinique", "America/Guadeloupe",
        "America/Cayenne", "America/Marigot", "America/St_Barthelemy", "America/Miquelon"
    ];

    function likelyEuropean() {
        var timeZone = "";
        try {
            timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        } catch (error) {
            return true;
        }
        if (!timeZone) return true;
        for (var i = 0; i < EUROPEAN_TIME_ZONES.length; i++) {
            if (timeZone.indexOf(EUROPEAN_TIME_ZONES[i]) === 0) return true;
        }
        var languages = (navigator.languages && navigator.languages.length)
            ? navigator.languages
            : [navigator.language || ""];
        for (var j = 0; j < languages.length; j++) {
            var parts = String(languages[j]).toLowerCase().split("-");
            var region = parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "";
            if (region.length === 2 && EUROPEAN_REGIONS.indexOf(region) !== -1) return true;
            if (parts.length === 1 && EUROPEAN_LANGUAGES.indexOf(parts[0]) !== -1) return true;
        }
        return false;
    }

    var inEurope = likelyEuropean();

    function readPreference(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function writePreference(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            // The current page still honors the choice when storage is unavailable.
        }
    }

    function setupTheme() {
        var html = document.documentElement;
        var controls = Array.from(document.querySelectorAll('.theme-toggle-group input[name="theme"]'));
        var allowedThemes = ["light", "dark", "system"];

        function applyTheme(theme, moveFocus) {
            if (!allowedThemes.includes(theme)) theme = "system";
            html.setAttribute("data-theme", theme);
            writePreference(THEME_KEY, theme);

            controls.forEach(function (control) {
                var selected = control.dataset.themeValue === theme;
                control.checked = selected;
                control.closest(".theme-option").classList.toggle("active", selected);
                if (selected && moveFocus) control.focus();
            });
        }

        controls.forEach(function (control) {
            control.addEventListener("change", function () {
                if (control.checked) applyTheme(control.dataset.themeValue, false);
            });
        });

        applyTheme(readPreference(THEME_KEY) || "system", false);
    }

    function doNotTrackEnabled() {
        var value = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
        return value === "1" || value === 1 || value === "yes";
    }

    function getConsent() {
        return readPreference(CONSENT_KEY) || sessionConsent;
    }

    function setConsent(status) {
        sessionConsent = status;
        writePreference(CONSENT_KEY, status);
    }

    // Whether Google Analytics may run right now: never under Do Not Track, an
    // explicit choice always wins, and with no choice yet it is on outside
    // Europe and off inside.
    function analyticsActive() {
        if (doNotTrackEnabled()) return false;
        var consent = getConsent();
        if (consent === "accepted") return true;
        if (consent === "rejected") return false;
        return !inEurope;
    }

    function consentState(analytics) {
        return {
            analytics_storage: analytics,
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
        };
    }

    function loadAnalytics() {
        if (!analyticsActive() || document.getElementById("ga-script")) return;

        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () {
            window.dataLayer.push(arguments);
        };

        // Defaults must be queued before the tag loads. Analytics on, ads off,
        // everywhere; then the European regions denied until an explicit Accept,
        // which Google applies from the visitor's network location.
        window.gtag("consent", "default", consentState("granted"));
        var europeanDefault = consentState("denied");
        europeanDefault.region = EUROPEAN_REGIONS;
        window.gtag("consent", "default", europeanDefault);
        if (getConsent() === "accepted") {
            window.gtag("consent", "update", consentState("granted"));
        }
        window.gtag("js", new Date());
        window.gtag("config", GA_ID);

        var script = document.createElement("script");
        script.id = "ga-script";
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
        document.head.appendChild(script);
    }

    function setupConsent() {
        var banner = document.getElementById("cookie-banner");
        var message = document.getElementById("cookie-message");
        var accept = document.getElementById("cookie-accept");
        var reject = document.getElementById("cookie-reject");
        var settings = document.getElementById("cookie-settings");
        if (!banner || !message || !accept || !reject || !settings) return;

        function showBanner(show, focusButton) {
            banner.style.display = show ? "flex" : "none";
            banner.setAttribute("aria-hidden", show ? "false" : "true");
            if (show && focusButton) {
                (accept.hidden ? reject : accept).focus();
            }
        }

        // Three banner variants: Do Not Track notice, European opt-in, opt-out
        // notice elsewhere.
        function renderBanner() {
            if (doNotTrackEnabled()) {
                message.textContent = "Do Not Track is on, so cookies are off.";
                accept.hidden = true;
                reject.textContent = "Close";
                return true;
            }
            accept.hidden = false;
            if (inEurope) {
                message.textContent = "We use cookies for analytics to improve your experience";
                accept.textContent = "Accept";
                reject.textContent = "Reject";
            } else {
                message.textContent = "We use cookies for analytics to improve your experience";
                accept.textContent = "OK";
                reject.textContent = "Turn off";
            }
            return false;
        }

        accept.addEventListener("click", function () {
            if (doNotTrackEnabled()) {
                showBanner(false, false);
                return;
            }
            setConsent("accepted");
            loadAnalytics();
            if (typeof window.gtag === "function") {
                window.gtag("consent", "update", consentState("granted"));
            }
            showBanner(false, false);
        });

        reject.addEventListener("click", function () {
            if (doNotTrackEnabled()) {
                showBanner(false, false);
                return;
            }

            var analyticsWasLoaded = Boolean(document.getElementById("ga-script"));
            setConsent("rejected");
            showBanner(false, false);

            if (analyticsWasLoaded) {
                window.gtag("consent", "update", consentState("denied"));
                window.location.reload();
            }
        });

        settings.addEventListener("click", function (event) {
            event.preventDefault();
            renderBanner();
            showBanner(true, true);
        });

        banner.addEventListener("keydown", function (event) {
            if (event.key === "Escape") showBanner(false, false);
        });

        var dnt = renderBanner();
        var consent = getConsent();
        if (dnt) {
            showBanner(false, false);
        } else if (consent === "accepted") {
            loadAnalytics();
        } else if (consent === null) {
            // No choice yet: outside Europe analytics starts now and the banner
            // offers the opt-out; inside Europe it waits for Accept.
            if (!inEurope) loadAnalytics();
            showBanner(true, false);
        }
    }

    function loadCloudflareBeacon() {
        if (!CF_BEACON_TOKEN || doNotTrackEnabled() || document.getElementById("cf-beacon")) return;
        var script = document.createElement("script");
        script.id = "cf-beacon";
        script.defer = true;
        script.src = "https://static.cloudflareinsights.com/beacon.min.js";
        script.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_BEACON_TOKEN }));
        document.head.appendChild(script);
    }

    function setupAnalyticsEvents() {
        document.querySelectorAll('a[href*="apps.apple.com"]').forEach(function (link) {
            link.addEventListener("click", function () {
                if (analyticsActive() && typeof window.gtag === "function") {
                    window.gtag("event", "app_store_click", { link_url: link.href });
                }
            });
        });
    }

    function setFooterYear() {
        var year = document.getElementById("year");
        if (year) year.textContent = new Date().getFullYear();
    }

    // Faint food emoji drifting behind the page (homepage). Purely decorative;
    // the layer is aria-hidden and disappears under prefers-reduced-motion.
    function setupSky() {
        var slots = document.querySelectorAll(".sky span");
        if (!slots.length) return;
        var food = ["🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🥭","🍍","🥝","🍅","🥑","🥦","🥬","🥒","🌽","🥕","🍕","🍔","🥪","🌮","🥙","🥚","🍳","🥘","🍲","🥣","🍜","🍝","🍛","🍣","🍱","🥟","🍤","🍙","🍞","🥐","🥨","🧇","🍰","🧁","🍩","🍪","🍫","🥛","🧀","🥗","🥜"];
        var pick = function () { return food[Math.floor(Math.random() * food.length)]; };
        slots.forEach(function (el) {
            el.textContent = pick();
            el.addEventListener("animationiteration", function () { el.textContent = pick(); });
        });
    }

    // Endless screenshot strip: clone the single group until the clones cover the
    // strip, so the CSS loop is seamless at any viewport while the gap stays fixed.
    // Skipped under reduced motion, which leaves a plain swipeable strip.
    function setupMarquee() {
        var strip = document.querySelector(".marquee");
        if (!strip) return;
        var group = strip.querySelector(".marquee-group");
        var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        var timer = null;
        function fill() {
            strip.querySelectorAll('.marquee-group[aria-hidden="true"]').forEach(function (g) { g.remove(); });
            strip.classList.remove("is-live");
            if (reduce.matches) return;
            var gap = parseFloat(getComputedStyle(strip).columnGap) || 0;
            var unit = group.getBoundingClientRect().width + gap;
            if (!unit) return;
            var clones = Math.ceil(strip.clientWidth / unit);
            for (var i = 0; i < clones; i++) {
                var c = group.cloneNode(true);
                c.setAttribute("aria-hidden", "true");
                c.querySelectorAll("img").forEach(function (img) { img.alt = ""; });
                strip.appendChild(c);
            }
            strip.style.setProperty("--marquee-duration", Math.round(unit / 22) + "s");
            strip.classList.add("is-live");
        }
        fill();
        if ("IntersectionObserver" in window) {
            new IntersectionObserver(function (entries) {
                strip.classList.toggle("is-offscreen", !entries[0].isIntersecting);
            }, { rootMargin: "200px 0px" }).observe(strip);
        }
        window.addEventListener("resize", function () { clearTimeout(timer); timer = setTimeout(fill, 150); });
        if (reduce.addEventListener) reduce.addEventListener("change", fill);
    }

    setupTheme();
    setupConsent();
    loadCloudflareBeacon();
    setupAnalyticsEvents();
    setFooterYear();
    setupSky();
    setupMarquee();
})();
