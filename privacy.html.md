<!-- AUTO-GENERATED from privacy.html. Do not edit by hand; edit the HTML and run python scripts/html_to_md.py. -->

> **Markdown version** of [https://snapnutritionai.app/privacy.html](https://snapnutritionai.app/privacy.html) — a clean, agent-friendly mirror of the HTML page.

# Privacy Policy

Last updated: October 24, 2026

SnapNutrition AI ("we", "our", or "the app") is committed to protecting your privacy. This Privacy Policy explains what information we and our service providers handle when you use our iOS application, the snapnutritionai.app website, and related services.

## The Two Usage Modes

SnapNutrition AI offers two ways to use the app. Your data flow differs between them, so this policy describes both:

- **BYOK (Bring Your Own Key)** — the free, default option. You provide your own API key for one of four AI providers — Google Gemini, OpenAI, Anthropic, or OpenRouter — which is stored only on your device. Scan requests go directly from your device to the AI provider; we operate no backend and never see your data.
- **Auto Mode** — an optional auto-renewing subscription ($2.99/month or $29.99/year, billed by Apple, includes a 3-day free trial). Scan requests pass through a proxy we operate, which checks your subscription and that the request came from a genuine copy of the app, applies a fair-use daily scan limit, and forwards the request to OpenAI. We never store your food photos. We log a small pseudonymous data point per scan (see "Auto Mode Telemetry" below).

## Information We Collect

SnapNutrition AI does not require account registration or login.

**Stored locally on your device only:**

- Food scan history and meal logs
- Daily calorie goals and macro targets
- Your Daily Goal profile — biological sex, age, height, weight, activity level and goal — whether you type it in or import it from Apple Health
- App settings (language, measurement units, theme)
- In BYOK mode: your API key for each AI provider you have configured (stored in the iOS Keychain with hardware-level encryption)
- In Auto Mode: a randomly generated user identifier ("appAccountToken") used by Apple StoreKit and by our proxy to verify your subscription

**Stored in your personal iCloud (only if you enable iCloud sync):** the same scan history, goals, and settings, synced across your Apple devices via Apple's CloudKit. This sync is operated by Apple, not by us, and is subject to [Apple's Privacy Policy](https://www.apple.com/legal/privacy/).

## Apple Health

SnapNutrition AI works with Apple Health in two separate ways. Both are optional, each has its own switch and Apple's own permission prompt, and neither does anything until you turn it on.

### Reading your profile for the Daily Goal

The app can read four values from Apple Health to prefill the Daily Goal calculator: **biological sex, date of birth, height, and body mass**. That is the whole list.

- **Off until you ask for it.** Nothing is read until you turn on the Apple Health toggle on the Daily Goal screen and grant permission. You can decline and type the same values in by hand.
- **Used for one purpose:** calculating a suggested daily calorie target. The imported values are stored in the app on your device alongside the rest of your settings, and are synced only if you have enabled iCloud sync.

### Saving your meals to Apple Health

From version 1.6, the app can also save the meals you log to Apple Health. Each meal becomes four nutrition entries, **dietary energy (calories), protein, carbohydrates, and fat**, dated when you ate it and labeled with the meal's name.

- **Off until you turn it on.** Nothing is written until you switch on Save Meals to Apple Health, in Settings under Data & Sync or when the app first offers it, and allow it in Apple's prompt. The app asks to write those four types only, and asks to read none of them.
- **Health stays in step with your diary.** When you edit a meal, its entries are updated; when you delete it, they are removed. Each entry carries the meal's identifier so the app can find its own entries again. The app cannot see entries made by other apps.
- Meals logged before you turned it on reach Health only if you choose Copy Earlier Meals, or edit one of them.
- Turning the switch off stops new entries. Deleting a meal still removes what the app wrote for it, and you can delete the entries yourself in the Health app at any time.

### For both

- **Health data is never sent to an AI provider, to our proxy, or to us.** It is not part of any scan request in either usage mode, and it is never used for advertising or marketing.
- You can revoke either permission at any time in the Health app, under Sharing, and turn each switch off in SnapNutrition AI.

## BYOK Mode — Data Processing

When you scan food in BYOK mode:

- Images or text descriptions of food are sent directly from your device to whichever AI provider you configured — Google, OpenAI, Anthropic, or OpenRouter — for nutritional analysis, using your own API key.
- Each provider processes that data under its own privacy policy and terms, which apply directly between you and them. Free API tiers may carry different data-handling terms than paid ones; Google's free Gemini tier, for example, permits human review of prompts to improve their products.
- The request does not pass through any server operated by us.
- We have no visibility into the content or metadata of the request.

## Auto Mode — Data Processing

In Auto Mode your scan goes through a proxy we operate, which checks that your
subscription is active and that the request came from a genuine copy of the app, applies a
fair-use daily scan limit, and forwards the photo or description to OpenAI for analysis.

Your food photo passes through in memory only. We do not write it to disk or keep it
anywhere. Apple's subscription receipt is checked and discarded within the request.

## Auto Mode — Telemetry

For each Auto Mode scan we record one pseudonymous data point, used only to enforce the
daily limit and to spot abuse:

- A random identifier generated on your device, not linked to you
- The scan type, whether the subscription is in trial or paid, the running daily count, and how long the request took

It contains no food content, no photos, no name and no email address, and is purged
automatically after 90 days.

## Subscription Billing

If you subscribe to Auto Mode, all payment processing is handled by Apple via the App Store. Apple charges your Apple ID, deducts its standard commission, and pays us net revenue. We never receive your credit-card number, billing address, or other Apple ID account details. Apple's handling of this data is governed by the [Apple Privacy Policy](https://www.apple.com/legal/privacy/).

To manage or cancel an Auto Mode subscription, use the App Store's subscription management (Settings → [your name] → Subscriptions on iOS).

## Barcode Lookups

When you scan a packaged-food barcode, the barcode number is sent to the [Open Food Facts](https://world.openfoodfacts.org/) public database (operated by a non-profit) to retrieve product nutrition information. Only the barcode digits are transmitted — no other data. Open Food Facts has its own [privacy policy](https://world.openfoodfacts.org/privacy-policy).

## Third-Party Service Providers

Depending on the mode you use, the following third parties may process your data on our behalf or directly:

- **Google (Gemini)** — BYOK mode AI provider — [Privacy Policy](https://policies.google.com/privacy)
- **Anthropic (Claude)** — BYOK mode AI provider — [Privacy Policy](https://www.anthropic.com/privacy)
- **OpenRouter** — BYOK mode AI provider (routes to the upstream model you select) — [Privacy Policy](https://openrouter.ai/privacy)
- **OpenAI** — BYOK mode AI provider and Auto Mode AI provider — [Privacy Policy](https://openai.com/privacy)
- **Cloudflare** — Auto Mode proxy and telemetry (sub-processor we operate; data subject to [Cloudflare's Privacy Policy](https://www.cloudflare.com/privacypolicy/))
- **Apple** — App Store subscription billing, App Attest device integrity, optional iCloud sync — [Privacy Policy](https://www.apple.com/legal/privacy/)
- **Open Food Facts** — barcode → nutrition lookup — [Privacy Policy](https://world.openfoodfacts.org/privacy-policy)
- **Google Analytics** — optional website analytics on this site only (not in the app) — [Google Privacy Policy](https://policies.google.com/privacy)
- **OpenAI (ChatGPT Ads measurement pixel)** — optional measurement of visits from our ads in ChatGPT, on this site only (not in the app); it runs under the same analytics choice as Google Analytics — [OpenAI Privacy Policy](https://openai.com/policies/privacy-policy/)
- **Cloudflare Web Analytics** — cookieless, aggregate page-view counts on this site only (not in the app); it sets no cookies, stores nothing in your browser, and does not identify or track you across sites — [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/)

## Website Analytics and Consent

This website uses two optional measurement tools. Google Analytics tells us how the site is used. The ChatGPT Ads measurement pixel from OpenAI tells us whether visits that started from an ad we run in ChatGPT reach this site and lead to clicks on the App Store link. Whether each runs before you make a choice depends on where you are:

- **European Economic Area:** neither tool is loaded until you select “Accept” in the banner.
- **United Kingdom:** Google Analytics runs from your first page view to produce aggregate statistics that help us improve the site, as UK law permits, with Google Signals and ad personalisation switched off. The OpenAI pixel is not loaded until you select “Accept”. “Reject all” turns both off.
- **Switzerland and everywhere else:** both tools run from your first page view, and the banner lets you turn them off.

Your choice is stored in your browser, covers both tools, and applies to later visits. We determine the region from your device’s time zone and language settings, treating unclear European cases under the European Economic Area rules, and Google’s Consent Mode additionally applies the European Economic Area default based on your network location. This website does not change its behavior in response to browser Do Not Track signals; use “Cookie Settings” instead.

When it runs, Google Analytics may process the page viewed, referring page, timestamp, browser and device characteristics, screen size, approximate location derived from the network request, and clicks on App Store download links. When it runs, the OpenAI pixel sets first-party cookies holding an ad click reference and sends OpenAI the page viewed, its title and address, a timestamp, clicks on App Store download links, and the browser data and network address that accompany any web request. Neither tool receives your name, email address, food diary, food photos, or SnapNutrition app identifier. We do not show ads on this site or in the app.

You can change your choice at any time through “Cookie Settings” in the footer. Turning measurement off after it was running immediately disables future analytics and ad measurement events, removes the measurement pixel’s cookies, and reloads the page without the Google Analytics and OpenAI scripts.

Separately from these tools, this website counts page views with Cloudflare Web Analytics. It runs without the banner because it uses no cookies, stores nothing on your device, and does not build a profile of you: Cloudflare receives the page viewed, the referring page, and coarse browser and country information, and reports them to us only as aggregate totals.

## Data We Do Not Collect

- We never ask for your name, email, phone number, address, or any other identifying information.
- We do not require account creation or login.
- We do not store your food photos or analysis results on our servers.
- In BYOK mode, no app data ever passes through our infrastructure.
- We do not sell, rent, or trade any data to third parties for advertising or any other purpose.
- We do not use cookies or tracking technologies in the iOS app.

## Data Retention and Your Control

All meal data is stored locally on your device and/or in your personal iCloud account, and you can delete it at any time by:

- Deleting individual food entries within the app
- Clearing all app data through iOS Settings
- Uninstalling the app

For Auto Mode: the device-verification key and your scan counter persist while your subscription is active and are purged within 90 days of cancellation. Telemetry is purged 90 days after it is created.

## European Users (GDPR)

If you are in the European Economic Area, United Kingdom, or Switzerland, you have the following rights under the General Data Protection Regulation regarding personal data we process about you (limited to Auto Mode infrastructure data and the website measurement described above; BYOK app mode involves no processing by us):

- **Right of access** — request a copy of the data we hold
- **Right to rectification** — request correction of inaccurate data
- **Right to erasure** — request deletion of your data (effectively achieved by cancelling Auto Mode; complete purge follows within 90 days)
- **Right to restrict or object to processing**
- **Right to data portability**
- **Right to lodge a complaint** with your national data-protection authority

The legal basis for Auto Mode processing is the performance of a contract (Apple StoreKit subscription) under GDPR Article 6(1)(b). The legal basis for cookieless aggregate page-view counting with Cloudflare Web Analytics is our legitimate interest in knowing how many people read this site (GDPR Article 6(1)(f)); it involves no cookies or identifiers. In the European Economic Area, the legal basis for Google Analytics and the ChatGPT Ads measurement pixel is your consent under GDPR Article 6(1)(a), which you can withdraw at any time through Cookie Settings. In the United Kingdom, the legal basis for Google Analytics is our legitimate interest in understanding how the site is used so we can improve it, and the legal basis for the measurement pixel is your consent. In Switzerland and elsewhere, both run on our legitimate interest in measuring the site and our advertising, and you can object at any time through Cookie Settings. To exercise any right above, email [privacy@snapnutritionai.app](mailto:privacy@snapnutritionai.app); include your appAccountToken (visible in the app's Settings) only when your request concerns Auto Mode — we'll respond within 30 days.

## California Users (CCPA / CPRA)

If you are a California resident, you have the following rights under the California Consumer Privacy Act and California Privacy Rights Act regarding personal information we process:

- Right to know what categories of personal information we collect and how we use them
- Right to delete personal information we hold (subject to legal exceptions)
- Right to correct inaccurate personal information
- Right to opt out of any "sale" or "sharing" of personal information — we do not sell or share personal information, so this opt-out is effectively always active for our users
- Right to non-discrimination for exercising these rights

To exercise these rights, email [privacy@snapnutritionai.app](mailto:privacy@snapnutritionai.app).

## Data Security

API keys are stored in the iOS Keychain with hardware-level encryption. Traffic to AI providers and to our proxy is encrypted with HTTPS/TLS, and what the proxy keeps is encrypted at rest. We have no access to your Apple ID payment details or your iCloud-synced data.

## Children's Privacy

The app is not directed at children under the age of 13 in the United States, or under the age of 16 in the European Economic Area. We do not knowingly collect information from children below these ages. If you believe we have inadvertently received such information, please contact us and we will delete it.

## Changes to This Policy

We may update this Privacy Policy from time to time, particularly as the app evolves. We will post the new Privacy Policy on this page and update the "Last updated" date at the top. Material changes will also be surfaced in the app's "What's New" screen.

## Contact Us

If you have any questions about this Privacy Policy or wish to exercise any rights described above, please email:

[privacy@snapnutritionai.app](mailto:privacy@snapnutritionai.app)

For product or billing questions, see our general support address:

[support@snapnutritionai.app](mailto:support@snapnutritionai.app)
