(function () {
    "use strict";

    var THEME_KEY = "snapnutrition_theme";
    var CONSENT_KEY = "snapnutrition_cookie_consent";
    var GA_ID = "G-JJFTFWZEQ2";
    var sessionConsent = null;

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

    function analyticsAllowed() {
        return !doNotTrackEnabled() && getConsent() === "accepted";
    }

    function loadAnalytics() {
        if (!analyticsAllowed() || document.getElementById("ga-script")) return;

        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () {
            window.dataLayer.push(arguments);
        };

        window.gtag("consent", "default", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
        });
        window.gtag("consent", "update", {
            analytics_storage: "granted",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
        });
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

        var defaultMessage = message.textContent;

        function showBanner(show, focusButton) {
            banner.style.display = show ? "flex" : "none";
            banner.setAttribute("aria-hidden", show ? "false" : "true");
            if (show && focusButton) {
                (accept.hidden ? reject : accept).focus();
            }
        }

        function reflectDoNotTrack() {
            var enabled = doNotTrackEnabled();
            message.textContent = enabled
                ? "Your browser's Do Not Track setting is on, so site analytics is disabled."
                : defaultMessage;
            accept.hidden = enabled;
            reject.textContent = enabled ? "Close" : "Reject";
            return enabled;
        }

        accept.addEventListener("click", function () {
            if (doNotTrackEnabled()) {
                showBanner(false, false);
                return;
            }
            setConsent("accepted");
            loadAnalytics();
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
                window.gtag("consent", "update", {
                    analytics_storage: "denied",
                    ad_storage: "denied",
                    ad_user_data: "denied",
                    ad_personalization: "denied"
                });
                window.location.reload();
            }
        });

        settings.addEventListener("click", function (event) {
            event.preventDefault();
            reflectDoNotTrack();
            showBanner(true, true);
        });

        banner.addEventListener("keydown", function (event) {
            if (event.key === "Escape") showBanner(false, false);
        });

        reflectDoNotTrack();
        if (doNotTrackEnabled()) {
            showBanner(false, false);
        } else if (getConsent() === "accepted") {
            loadAnalytics();
        } else if (getConsent() === null) {
            showBanner(true, false);
        }
    }

    function setupAnalyticsEvents() {
        document.querySelectorAll('a[href*="apps.apple.com"]').forEach(function (link) {
            link.addEventListener("click", function () {
                if (analyticsAllowed() && typeof window.gtag === "function") {
                    window.gtag("event", "app_store_click", { link_url: link.href });
                }
            });
        });
    }

    function setFooterYear() {
        var year = document.getElementById("year");
        if (year) year.textContent = new Date().getFullYear();
    }

    setupTheme();
    setupConsent();
    setupAnalyticsEvents();
    setFooterYear();
})();
