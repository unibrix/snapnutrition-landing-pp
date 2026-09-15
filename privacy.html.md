<!-- AUTO-GENERATED from privacy.html. Do not edit by hand; edit the HTML and run python scripts/html_to_md.py. -->

> **Markdown version** of [https://snapnutritionai.app/privacy.html](https://snapnutritionai.app/privacy.html) — a clean, agent-friendly mirror of the HTML page.

# Privacy Policy

Last updated: September 15, 2026

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

SnapNutrition AI can read four values from Apple Health to prefill the Daily Goal calculator: **biological sex, date of birth, height, and body mass**. That is the whole list.

- **It is optional and off until you ask for it.** Nothing is read until you turn on the Apple Health toggle on the Daily Goal screen and grant permission in Apple's own prompt. You can decline and type the same values in by hand.
- **Read only. The app never writes to Apple Health** — it requests no write permission at all, so it cannot add, change, or delete anything in your Health data.
- **Used for one purpose:** calculating a suggested daily calorie target. The imported values are stored in the app on your device alongside the rest of your settings, and are synced only if you have enabled iCloud sync.
- **Health data is never sent to an AI provider, to our proxy, or to us.** It is not part of any scan request in either usage mode.
- You can revoke access at any time in the Health app, under Sharing, and turn the toggle off in SnapNutrition AI.

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

## Website Analytics and Consent

Google Analytics is not loaded until you select “Accept” in the analytics banner, and stays
disabled if your browser sends a Do Not Track signal. Your choice is stored in your browser.

When you consent, Google Analytics may process the page viewed, referring page, timestamp, browser and device characteristics, screen size, approximate location derived from the network request, and clicks on App Store download links. We do not send Google Analytics your name, email address, food diary, food photos, or SnapNutrition app identifier.

You can change your choice through “Cookie Settings” in the footer. Rejecting after a previous acceptance immediately disables future analytics events and reloads the page without the Google Analytics script.

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

If you are in the European Economic Area, United Kingdom, or Switzerland, you have the following rights under the General Data Protection Regulation regarding personal data we process about you (limited to Auto Mode infrastructure data and website analytics you consent to; BYOK app mode involves no processing by us):

- **Right of access** — request a copy of the data we hold
- **Right to rectification** — request correction of inaccurate data
- **Right to erasure** — request deletion of your data (effectively achieved by cancelling Auto Mode; complete purge follows within 90 days)
- **Right to restrict or object to processing**
- **Right to data portability**
- **Right to lodge a complaint** with your national data-protection authority

The legal basis for Auto Mode processing is the performance of a contract (Apple StoreKit subscription) under GDPR Article 6(1)(b). The legal basis for optional website analytics is your consent under GDPR Article 6(1)(a), which you can withdraw at any time through Cookie Settings. To exercise any right above, email [privacy@snapnutritionai.app](mailto:privacy@snapnutritionai.app); include your appAccountToken (visible in the app's Settings) only when your request concerns Auto Mode — we'll respond within 30 days.

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
