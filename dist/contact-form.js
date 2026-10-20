if (!window.__nikaContactBound) {
  window.__nikaContactBound = true;
  document.addEventListener('submit', async event => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || form.id !== 'contact-form') return;
    event.preventDefault();
    if (!form.reportValidity() || form.dataset.sending) return;
    const status = document.getElementById('contact-status');
    const button = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form));
    form.dataset.submissionId ||= crypto.randomUUID();
    data.submissionId = form.dataset.submissionId;
    form.dataset.sending = 'true'; button.disabled = true; status.textContent = 'Sending…';
    try {
      const response = await fetch('/api/contact', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Message could not be sent. Please try again.');
      status.textContent = 'Thank you — your message has been sent.'; form.reset(); delete form.dataset.submissionId;
    } catch (error) { status.textContent = error.message || 'Please try again or email nika@hamid.com.'; }
    finally { delete form.dataset.sending; button.disabled = false; }
  });
  document.addEventListener('input', event => { const form = event.target.closest?.('#contact-form'); if(form) delete form.dataset.submissionId; });
}
