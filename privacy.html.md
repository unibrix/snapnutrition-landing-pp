<!-- AUTO-GENERATED from privacy.html. Do not edit by hand; edit the HTML and run python scripts/html_to_md.py. -->

> **Markdown version** of [https://snapnutritionai.app/privacy.html](https://snapnutritionai.app/privacy.html) — a clean, agent-friendly mirror of the HTML page.

# Privacy Policy

Last updated: August 18, 2026

SnapNutrition AI ("we", "our", or "the app") is committed to protecting your privacy. This Privacy Policy explains what information we and our service providers handle when you use our iOS application, the snapnutritionai.app website, and related services.

## The Two Usage Modes

SnapNutrition AI offers two ways to use the app. Your data flow differs between them, so this policy describes both:

- **BYOK (Bring Your Own Key)** — the free, default option. You provide your own API key for one of four AI providers — Google Gemini, OpenAI, Anthropic, or OpenRouter — which is stored only on your device. Scan requests go directly from your device to the AI provider; we operate no backend and never see your data.
- **Auto Mode** — an optional auto-renewing subscription ($2.99/month or $29.99/year, billed by Apple, includes a 3-day free trial). Scan requests pass through a minimal Cloudflare-hosted proxy we operate, which verifies your Apple subscription, runs an Apple App Attest device-integrity check, applies a fair-use daily scan limit, and forwards the request to OpenAI. We never store your food photos. We log a small amount of pseudonymous operational telemetry per scan (see "Auto Mode Telemetry" below).

## Information We Collect

SnapNutrition AI does not require account registration or login.

**Stored locally on your device only:**

- Food scan history and meal logs
- Daily calorie goals and macro targets
- App settings (language, measurement units, theme)
- In BYOK mode: your API key for each AI provider you have configured (stored in the iOS Keychain with hardware-level encryption)
- In Auto Mode: a randomly generated user identifier ("appAccountToken") used by Apple StoreKit and by our proxy to verify your subscription

**Stored in your personal iCloud (only if you enable iCloud sync):** the same scan history, goals, and settings, synced across your Apple devices via Apple's CloudKit. This sync is operated by Apple, not by us, and is subject to [Apple's Privacy Policy](https://www.apple.com/legal/privacy/).

## BYOK Mode — Data Processing

When you scan food in BYOK mode:

- Images or text descriptions of food are sent directly from your device to whichever AI provider you configured — Google, OpenAI, Anthropic, or OpenRouter — for nutritional analysis, using your own API key.
- Each provider processes that data under its own privacy policy and terms, which apply directly between you and them. Free API tiers may carry different data-handling terms than paid ones; Google's free Gemini tier, for example, permits human review of prompts to improve their products.
- The request does not pass through any server operated by us.
- We have no visibility into the content or metadata of the request.

## Auto Mode — Data Processing

When you scan food in Auto Mode, the following occurs:

- Your device sends the scan request to our Cloudflare Workers proxy at `api.snapnutritionai.app`.
- The proxy verifies your active Apple subscription using a cryptographically signed receipt (JWS) issued by Apple StoreKit. We do not store the receipt content beyond the request lifetime.
- The proxy verifies your device's authenticity using Apple App Attest. To enable this, your device's App Attest public key (one per install) is stored in our Cloudflare KV store. We never receive your device's private key.
- The proxy applies a daily fair-use scan limit using a per-user counter (stored in a Cloudflare Durable Object, reset every 24 hours UTC).
- The proxy forwards your food photo or text description to OpenAI's GPT-4 vision model for analysis. The photo passes through the proxy in memory; we do not write food photos to disk or persist them in any store.
- The proxy returns OpenAI's response to your device.

## Auto Mode — Telemetry

For each Auto Mode scan request, we log one pseudonymous data point to Cloudflare Workers Analytics Engine (a time-series telemetry service) for rate-limit enforcement and operational health monitoring:

- The pseudonymous user identifier ("appAccountToken" — a UUID generated on your device, not linked to any personal information)
- The scan type (photo, voice, text, or barcode)
- The lifecycle state (trial / paid)
- The current daily scan count and the request latency

This telemetry does not contain food content, food photos, request bodies, API responses, your name, or your email address. It is automatically purged from Cloudflare after 90 days. It is used solely to operate the rate-limit cap and to detect abuse patterns (e.g. unusual scan rates from a single account).

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

Google Analytics is not loaded until you select “Accept” in the analytics banner. If your browser sends a Do Not Track signal, analytics remains disabled regardless of any earlier choice. Your preference is stored in your browser's local storage under `snapnutrition_cookie_consent`.

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

For Auto Mode infrastructure data: the App Attest public key and per-user rate-limit counter persist as long as your subscription is active and are automatically purged within 90 days after cancellation. Analytics Engine telemetry is automatically purged 90 days after creation.

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

API keys are stored in the iOS Keychain with hardware-level encryption. All communications with AI service providers and our proxy are encrypted using HTTPS/TLS. The Cloudflare proxy stores App Attest public keys and rate-limit counters in Cloudflare-hosted, encrypted-at-rest storage. We never have access to your device's App Attest private key, your Apple ID payment details, or your iCloud-synced data.

## Children's Privacy

The app is not directed at children under the age of 13 in the United States, or under the age of 16 in the European Economic Area. We do not knowingly collect information from children below these ages. If you believe we have inadvertently received such information, please contact us and we will delete it.

## Changes to This Policy

We may update this Privacy Policy from time to time, particularly as the app evolves. We will post the new Privacy Policy on this page and update the "Last updated" date at the top. Material changes will also be surfaced in the app's "What's New" screen.

## Contact Us

If you have any questions about this Privacy Policy or wish to exercise any rights described above, please email:

[privacy@snapnutritionai.app](mailto:privacy@snapnutritionai.app)

For product or billing questions, see our general support address:

[support@snapnutritionai.app](mailto:support@snapnutritionai.app)
