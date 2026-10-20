export function ContactForm() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-intro">
        <h2 id="contact-heading" className="font-serif text-4xl">Get in touch</h2>
        <a href="mailto:nika@hamid.com">nika@hamid.com</a>
      </div>
      <form id="contact-form" action="/api/contact" method="post" aria-describedby="contact-help">
        <label className="contact-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <div className="contact-fields">
          <label htmlFor="contact-name">Name<input id="contact-name" name="name" autoComplete="name" required maxLength={120} /></label>
          <label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        </div>
        <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" rows={5} required maxLength={5000} /></label>
        <div className="contact-form-footer">
          <p id="contact-help">Your message goes directly to my inbox.</p>
          <button type="submit">Send message <span aria-hidden="true">↗</span></button>
        </div>
        <p id="contact-status" role="status" aria-live="polite" />
      </form>
      <script src="/contact-form.js" defer />
    </section>
  );
}
