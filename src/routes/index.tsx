import { createFileRoute } from "@tanstack/react-router";
import { Download, ArrowUpRight, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { NowPlaying } from "@/components/NowPlaying";
import { PhotoBooth } from "@/components/PhotoBooth";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Button } from "@/components/ui/button";

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

const links = [
  { label: "GitHub", href: "https://github.com/ctrlnika" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nikahamid" },
  { label: "hamid.com", href: "https://hamid.com" },
  { label: "Instagram", href: "https://www.instagram.com/nikaology/" },
  { label: "Spotify", href: "https://open.spotify.com/user/ggs1ol58ivodmnb9e684wl86w" },
  { label: "nika@hamid.com", href: "mailto:nika@hamid.com" },
];

function Index() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:py-16">
      <header className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span className="hidden sm:inline">hamid.com</span>
        <nav className="flex items-center gap-4 sm:gap-5">
          <a href="#projects" className="hover:text-foreground">Projects</a>
          <a href="#experience" className="hover:text-foreground">Experience</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
          <Button asChild variant="link" className="h-auto p-0 font-mono text-xs uppercase tracking-widest">
            <a href="/Nika-Jahankhah-CV.pdf" download="Nika-Jahankhah-CV.pdf" aria-label="Download CV as PDF">CV <Download /></a>
          </Button>
        </nav>
      </header>

      <section className="hero-layout">
        <div className="hero-intro">
          <p className="mb-4 text-sm text-muted-foreground">London, UK</p>
          <h1 className="font-serif text-6xl leading-none tracking-tight text-primary sm:text-7xl md:text-8xl">Nika <em>Jahankhah</em></h1>
        </div>
        <div className="hero-photo"><PhotoBooth /></div>
        <div className="hero-actions">
          <div className="social-panel">
            <p className="social-heading">Find me elsewhere</p>
            <a className="social-link social-featured" href="https://www.linkedin.com/in/nikahamid" target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" /><span><strong>Connect on LinkedIn</strong><small>Work, projects &amp; updates</small></span><ArrowUpRight aria-hidden="true" />
            </a>
            <div className="social-secondary">
              <a className="social-link" href="https://github.com/ctrlnika" target="_blank" rel="noreferrer"><Github aria-hidden="true" /><span>Explore my code</span><ArrowUpRight aria-hidden="true" /></a>
              <a className="social-link" href="https://www.instagram.com/nikaology/" target="_blank" rel="noreferrer"><Instagram aria-hidden="true" /><span>Instagram</span><ArrowUpRight aria-hidden="true" /></a>
              <a className="social-link" href="mailto:nika@hamid.com"><Mail aria-hidden="true" /><span>Send me an email</span><ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-utilities">
            <NowPlaying />
            <Button asChild variant="link" className="cv-download h-12 shadow-none">
              <a href="/Nika-Jahankhah-CV.pdf" download="Nika-Jahankhah-CV.pdf"><Download /> Download CV</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-6">
        <h2 className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">Education</h2>
        <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12">
          <p className="font-mono text-sm text-muted-foreground">Sep 2025 – Jun 2028<br /><span className="text-xs">Expected graduation</span></p>
          <div>
            <h3 className="font-serif text-3xl">BSc (Hons) Computer Science</h3>
            <p className="mt-2 text-muted-foreground">City St George's, University of London · London, UK</p>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              {[["Geometric Algorithms", "83.3%"], ["Operating Systems", "79%"], ["Discrete Mathematics for Computing", "71.1%"], ["Programming in Java", "67.5%"]].map(([subject, result]) => (
                <div key={subject} className="flex items-baseline justify-between gap-4 border-b border-border pb-3"><dt className="text-muted-foreground">{subject}</dt><dd className="shrink-0 font-mono">{result}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>


      <section id="experience" className="grid gap-10 pt-8 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Experience</h2>
          <ul>
            {experience.map(([when, role, org, detail]) => (
              <li key={role} className="grid grid-cols-[90px_1fr] gap-4 border-b border-border py-4">
                <span className="font-mono text-xs text-muted-foreground">{when}</span>
                <div>
                  <p className="font-serif text-xl">{role}</p>
                  <p className="text-sm text-muted-foreground">{org === "PERSAHOLIC" ? <a href="https://persaholic.com" target="_blank" rel="noreferrer">{org}</a> : org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Toolkit</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((k) => (
              <span key={k} className="border border-border px-3 py-1 text-sm">{k}</span>
            ))}
          </div>
          <h2 className="mb-4 mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">Certifications</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">{certifications.map((c) => <li key={c}>{c}</li>)}</ul>
          <p className="mt-6 text-sm text-muted-foreground">English & Persian (native), Spanish (proficient). London, UK.</p>
        </div>
      </section>

      <ProjectsSection />

      <section className="mt-16 border-t border-border pt-6">
        <h2 className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">Community & activities</h2>
        <ul className="grid gap-8 md:grid-cols-3">
          <li><p className="font-mono text-xs text-muted-foreground">Jan – Aug 2024</p><h3 className="mt-2 font-serif text-2xl">Tech, Tea &amp; Biscuits</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Helped older residents with digital accessibility needs navigate online services.</p></li>
          <li><p className="font-mono text-xs text-muted-foreground">Oct 2026 – Jun 2027</p><h3 className="mt-2 font-serif text-2xl">Data Science & AI Society</h3><p className="mt-2 text-sm text-muted-foreground">Outreach Ambassador</p></li>
          <li><p className="font-mono text-xs text-muted-foreground">Oct 2026 – Jun 2027</p><h3 className="mt-2 font-serif text-2xl">City MMA Club</h3><p className="mt-2 text-sm text-muted-foreground">Competing Member</p></li>
        </ul>
      </section>

      <section id="contact" className="contact-band my-16 p-6 sm:p-10">
        <a href="mailto:nika@hamid.com" className="font-serif text-3xl sm:text-5xl">nika@hamid.com</a>
      </section>

      <footer className="border-t border-border pt-6 font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nika Jahankhah
      </footer>
    </main>
  );
}

