# SURESHOT WITH PARII — Netlify landing page

Lightweight, responsive static landing page with a sticky Telegram CTA and an optional Netlify Function for Meta Conversions API.

## 1. Add your logo and banner
- Replace `assets/logo.png` with your logo image (keep the filename).
- Replace `assets/promo.webp` with your promotional/banner image (keep the filename). A JPG or PNG is okay if you update the `src` in `index.html`.
- Keep the banner compact/cropped around a 2.5:1 aspect ratio for best fit.

## 2. Set your Telegram link and Pixel ID
Edit `config.js`:
- `telegramUrl` is already set to `https://t.me/+Q51L9JJ6zqs4Y2I1`.
- `pixelId` is already set to `1746781019767025`.
- `trackLeadOnClick`: currently `true`, so clicking the Telegram CTA is counted as a Lead as well as the custom `JoinTelegramClick` event. A click does **not** confirm a Telegram join; set to `false` if you only want the custom click event.
- `trackSubscribeOnClick`: defaults to `false`. Only enable if you intentionally define Subscribe as a button-click proxy; it does not prove a subscription.

The Meta Pixel ID is public by design. Never put your CAPI access token in `config.js`, HTML, or client-side JavaScript.

## 3. Deploy to Netlify
1. Upload the project folder to a GitHub repository, or drag the folder (not a ZIP) to Netlify's manual deploy page: https://app.netlify.com/drop
2. For CAPI, connect the GitHub repository to a Netlify site so Functions can be built and deployed. Static drag-and-drop alone may not publish/build the serverless function reliably.
3. Netlify build settings: publish directory `.`; functions directory `netlify/functions`. The included `netlify.toml` sets these.
4. In Netlify Site configuration → Environment variables, add:
   - `META_PIXEL_ID` = `1746781019767025` (must match the public Pixel ID in `config.js`)
   - `META_CAPI_ACCESS_TOKEN` = your secret access token
   - `META_GRAPH_API_VERSION` = a currently supported Meta Graph API version, in the format `vNN.N` (check Meta's current documentation before setting it)
   - `META_TEST_EVENT_CODE` = optional test code during testing only
5. Redeploy after setting environment variables.
6. Test browser Pixel events in Meta Events Manager → Test Events, and separately verify server events. Remove `META_TEST_EVENT_CODE` from production after testing.

## Important technical notes
- The function requires `META_GRAPH_API_VERSION`; set it to a currently supported version from Meta's official documentation before deployment.
- Browser Pixel and CAPI event IDs must match for the *same event* to deduplicate. This starter sends a custom click event to both and separate suffixed IDs for Lead/Subscribe. For reliable standard-event deduplication, confirm the browser and server event IDs and event configuration in Events Manager before running ads.
- This starter does not verify actual Telegram membership. It measures a CTA click. Real join verification needs a separate Telegram bot/backend integration.
- Configure a consent banner/consent management as required for your visitors and jurisdiction before enabling advertising tracking.
- No IP, email, phone number, or other personal information is collected or sent by this starter.
