// Progressive enhancement: preserve the native mailto form when JavaScript is unavailable.
if (!window.__nikaContactBound) {
  window.__nikaContactBound = true;
  document.addEventListener('submit', function (event) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || form.id !== 'contact-form') return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !message) {
      document.getElementById('contact-status').textContent = 'Please complete your name, email and message.';
      return;
    }
    const subject = encodeURIComponent('Portfolio enquiry from ' + name);
    const body = encodeURIComponent(message + '\n\nFrom: ' + name + '\nEmail: ' + email);
    window.location.href = 'mailto:nika@hamid.com?subject=' + subject + '&body=' + body;
    document.getElementById('contact-status').textContent = 'Your email app should open with a draft. Send it there, or email nika@hamid.com directly.';
  });
}
