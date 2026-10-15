(() => {
  'use strict';
  const cfg = window.SURESHOT_CONFIG || {};
  const url = typeof cfg.telegramUrl === 'string' ? cfg.telegramUrl : '';
  const validTelegramUrl = /^https:\/\/(t\.me|telegram\.me)\//i.test(url) && !url.includes('REPLACE_WITH_CHANNEL');
  document.querySelectorAll('[data-join]').forEach((button) => {
    if (validTelegramUrl) button.href = url;
    else {
      button.href = '#';
      button.addEventListener('click', (event) => {
        event.preventDefault();
        alert('Please add your Telegram channel link in config.js before publishing.');
      });
    }
    button.addEventListener('click', () => {
      if (!validTelegramUrl) return;
      const eventId = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'join_' + Date.now() + '_' + Math.random().toString(16).slice(2);
      const payload = { eventId, eventName: 'JoinTelegramClick', eventSourceUrl: location.href };
      if (typeof window.fbq === 'function' && cfg.pixelId && !String(cfg.pixelId).includes('YOUR_')) {
        window.fbq('trackCustom', 'JoinTelegramClick', {}, { eventID: eventId });
        if (cfg.trackLeadOnClick === true) window.fbq('track', 'Lead', {}, { eventID: eventId + '_lead' });
        if (cfg.trackSubscribeOnClick === true) window.fbq('track', 'Subscribe', {}, { eventID: eventId + '_subscribe' });
      }
      if (cfg.enableConversionsApi === true) {
        const events = [{ eventName: 'JoinTelegramClick', eventId }];
        if (cfg.trackLeadOnClick === true) events.push({ eventName: 'Lead', eventId: eventId + '_lead' });
        if (cfg.trackSubscribeOnClick === true) events.push({ eventName: 'Subscribe', eventId: eventId + '_subscribe' });
        events.forEach((evt) => {
          const body = JSON.stringify({ ...payload, eventName: evt.eventName, eventId: evt.eventId });
          if (navigator.sendBeacon) {
            try { navigator.sendBeacon('/.netlify/functions/meta-capi', new Blob([body], { type: 'application/json' })); }
            catch (_) { fetch('/.netlify/functions/meta-capi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {}); }
          } else {
            fetch('/.netlify/functions/meta-capi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
          }
        });
      }
    }, { passive: false });
  });
  const privacyLink = document.getElementById('privacy-link');
  const privacyNote = document.getElementById('privacy');
  if (privacyLink && privacyNote) privacyLink.addEventListener('click', (event) => {
    event.preventDefault(); privacyNote.classList.toggle('visible');
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
