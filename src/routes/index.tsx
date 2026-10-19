import { ContactForm } from "@/components/ContactForm";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Download, ArrowUp } from "lucide-react";
import { NowPlaying } from "@/components/NowPlaying";
import { PhotoBooth } from "@/components/PhotoBooth";
import { ProjectsSection } from "@/components/ProjectsSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nika Jahankhah — Software Engineer & Product Designer" },
      {
        name: "description",
        content: "Nika Jahankhah's software engineering and product design portfolio: Stalled London, civic tech, accessible banking, AI safety and Computer Science at City St George's.",
      },
      { property: "og:title", content: "Nika Jahankhah — Software Engineer & Product Designer" },
      {
        property: "og:description",
        content: "Civic technology, experience and education from Nika Jahankhah's October 2026 CV.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const experience = [
  ["Sep 2026 – Present", "Founder & Lead Full-Stack Engineer", "PERSAHOLIC", "Built the SQL-backed cloud signup system; reached a peak of 14 signups per week. From 12 Sep–5 Oct, 76% of site traffic was mobile, with 1.4 pages per session."],
  ["Mar 2026 – Present", "Software Engineer and Tester", "unicompute", "Built the TypeScript frontend and brand assets for okzulu.com. Tested across development, alpha, beta, UAT and production."],
  ["2026", "Pathways to Progress Programme Participant", "Generating Genius · PDT Partners × National Grid", "Participated in a finance hackathon at PDT Partners using the yfinance API; selected for a National Grid mock interview."],
  ["Jun – Jul 2025", "Financial Lines Group Intern", "Howden", "Restructured and validated Excel workbooks covering 9,988 insurance claims, tracked bot-generated errors and validated open claims across teams."],
  ["Jul 2024 – Jul 2025", "Education & Employability Administrative Assistant", "Light Project Pro International", "Coordinated stakeholder communications, scheduling and documentation for an employability cohort of 100."],
  ["Mar – Apr 2024", "Tech Futures Intern", "Ernst & Young", "Developed Python skills with EY.ai, hosted a panel with three technology professionals and contributed to the winning pitch. Received the Rising Star award."],
];

const skills = ["Python", "TypeScript", "JavaScript", "HTML", "CSS", "C++", "Java", "SQL", "React", "React Native", "Git", "Excel", "Microsoft 365", "Access", "IntelliJ", "Visual Studio Code"];
const certifications = ["CompTIA ITF+", "Microsoft Excel MO-200", "ConnectWise PSA", "Device Configuration"];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nikahamid" },
  { label: "GitHub", href: "https://github.com/ctrlnika" },
  { label: "Instagram", href: "https://www.instagram.com/nikaology/" },
  { label: "Email", href: "mailto:nika@hamid.com" },
];

function Index() {
  return (
    <main className="portfolio-page" id="top">
      <a className="skip-link" href="#projects">Skip to selected work</a>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Hamid.com — back to top"><span aria-hidden="true" />hamid.com</a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#projects" data-section="projects" aria-current="location">Work</a>
          <a href="#experience" data-section="experience">Experience</a>
          <a href="#contact" data-section="contact">Contact</a>
          <a href="/Nika-Jahankhah-CV.pdf" download="Nika-Jahankhah-CV.pdf" className="nav-cv">CV <Download size={14} aria-hidden="true" /></a>
        </nav>
      </header>

      <section className="editorial-hero" aria-labelledby="hero-name">
        <p className="hero-eyebrow">Software engineer <span aria-hidden="true">/</span> Product designer</p>
        <div className="hero-name-block">
          <h1 id="hero-name"><span>Nika</span><span>Jahankhah<span className="name-period">.</span></span></h1>
          <span className="persian-signature" lang="fa" dir="rtl" aria-label="Nika Jahankhah in Persian">نیکا جهانخواه</span>
        </div>
        <div className="hero-photo"><PhotoBooth /></div>
        <div className="hero-caption">
          <a className="work-jump text-link" href="#projects">Selected work <ArrowDownRight aria-hidden="true" /></a>
          <p className="location-note"><span className="vermilion-dot" aria-hidden="true" />London, UK</p>
          <div className="hero-socials">
            <p className="eyebrow">Socials</p>
            <nav className="social-links" aria-label="Social profiles and CV">
              {socials.map((l) => <a className="text-link" key={l.label} href={l.href} target={l.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">{l.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}
              <a className="text-link" href="/Nika-Jahankhah-CV.pdf" download="Nika-Jahankhah-CV.pdf">Download CV<Download size={14} aria-hidden="true" /></a>
            </nav>
          </div>
        </div>
        <div className="hero-listening"><NowPlaying /></div>
      </section>

      <ProjectsSection />

      <section id="experience" className="page-section record-layout" aria-labelledby="experience-heading">
        <div className="experience-record">
          <div className="section-header"><h2 id="experience-heading">Experience</h2><span className="eyebrow">The working record</span></div>
          <ol className="experience-list">
            {experience.map(([when, role, org, detail]) => (
              <li key={role} className="experience-row">
                <p className="record-date">{when}</p>
                <div>
                  <h3>{role}</h3>
                  <p className="record-organization">{org === "PERSAHOLIC" ? <a className="text-link" href="https://persaholic.com" target="_blank" rel="noreferrer">{org}<ArrowUpRight size={13} aria-hidden="true" /></a> : org}</p>
                  <p className="record-description">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="toolkit" aria-labelledby="toolkit-heading">
          <h2 id="toolkit-heading">Toolkit</h2>
          <ul className="skills-list">{skills.map((k) => <li key={k}>{k}</li>)}</ul>
          <h3>Certifications</h3>
          <ul className="certifications-list">{certifications.map((c) => <li key={c}>{c}</li>)}</ul>
          <p className="languages-note">English &amp; Persian (native), Spanish (proficient). London, UK.</p>
        </aside>
      </section>

      <section className="page-section education-section" aria-labelledby="education-heading">
        <div className="section-header"><h2 id="education-heading">Education</h2><span className="eyebrow">City St George’s</span></div>
        <div className="education-intro">
          <p className="record-date">Sep 2025 – Jun 2028<br /><span>Expected graduation</span></p>
          <div><h3>BSc (Hons) Computer Science</h3><p>City St George's, University of London · London, UK</p></div>
        </div>
        <dl className="coursework">
          {[["Geometric Algorithms", "83.3%"], ["Operating Systems", "79%"], ["Discrete Mathematics for Computing", "71.1%"], ["Programming in Java", "67.5%"]].map(([subject, result]) => (
            <div key={subject}><dt>{subject}</dt><dd>{result}</dd></div>
          ))}
        </dl>
      </section>

      <section className="page-section notes-section" aria-labelledby="notes-heading">
        <div className="section-header"><h2 id="notes-heading">Beyond the work</h2><span className="eyebrow">Writing &amp; community</span></div>
        <div className="notes-layout">
          <div className="linkedin-feature">
            <div className="linkedin-feature-heading"><h3>On LinkedIn</h3><a className="text-link" href="https://www.linkedin.com/feed/update/urn:li:activity:7514048395574104064" target="_blank" rel="noreferrer">Read post<ArrowUpRight size={15} aria-hidden="true" /></a></div>
            <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7514048392465993728?collapsed=1" title="Nika's LinkedIn post about university status, social capital and platform design" loading="lazy" className="linkedin-post" allowFullScreen />
          </div>
          <div className="community-section">
            <h3>Community &amp; activities</h3>
            <ul className="community-list">
              <li><p className="record-date">Jan – Aug 2024</p><h4>Tech, Tea &amp; Biscuits</h4><p>Helped older residents with digital accessibility needs navigate online services.</p></li>
              <li><p className="record-date">Oct 2026 – Jun 2027</p><h4>Data Science &amp; AI Society</h4><p>Outreach Ambassador</p></li>
              <li><p className="record-date">Oct 2026 – Jun 2027</p><h4>City MMA Club</h4><p>Competing Member</p></li>
            </ul>
          </div>
        </div>
      </section>

      <ContactForm />
      <footer className="site-footer"><a className="footer-wordmark" href="#top">hamid.com</a><p>© {new Date().getFullYear()} Nika Jahankhah</p><a className="text-link" href="#top">Back to top<ArrowUp size={15} aria-hidden="true" /></a></footer>
      <script src="/portfolio-interactions.js" defer />
    </main>
  );
}
