/* Public frontend configuration. Never put your Meta CAPI access token here. */
window.SURESHOT_CONFIG = {
  // Replace with your real public Telegram channel/invite URL.
  telegramUrl: 'https://t.me/+Q51L9JJ6zqs4Y2I1',
  // Replace with your Meta Pixel ID (digits only). Leave placeholder until ready.
  pixelId: '1746781019767025',
  // Set true only if you intentionally want a Telegram CTA click to count as a Meta Lead.
  // A click is not proof of an actual Telegram join.
  trackLeadOnClick: true,
  // Keep false unless a real subscription can be verified by your integration.
  trackSubscribeOnClick: false,
  // Send the same events to your Netlify Function for Meta CAPI.
  enableConversionsApi: true
};
