import { ArrowUpRight } from "lucide-react";

export function ContactForm() {
  return (
    <section id="contact" className="page-section contact-section" aria-labelledby="contact-heading">
      <div className="section-header"><h2 id="contact-heading">Get in touch<ArrowUpRight aria-hidden="true" /></h2><span className="eyebrow">A direct line</span></div>
      <div className="contact-layout">
        <div className="contact-intro"><a className="contact-email text-link" href="mailto:nika@hamid.com">nika@hamid.com</a><p id="contact-help">Opens a draft in your email app.<br />Send it there to get in touch.</p></div>
        <form id="contact-form" action="mailto:nika@hamid.com" method="post" encType="text/plain" aria-describedby="contact-help">
          <div className="contact-fields"><label htmlFor="contact-name">Name<input id="contact-name" name="name" autoComplete="name" required maxLength={120} /></label><label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label></div>
          <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" rows={4} required maxLength={5000} /></label>
          <div className="contact-form-footer"><span className="eyebrow">Name, email, a few words.</span><button type="submit" className="compose-button edge-light">Compose email <ArrowUpRight aria-hidden="true" /></button></div>
          <p id="contact-status" role="status" aria-live="polite" />
        </form>
      </div>
      <script src="/contact-form.js" defer />
    </section>
  );
}
