import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, ChevronDown, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/lib/projects";
import { askAboutProjects } from "@/lib/project-qa.functions";

const images: Record<string, string> = {
  Persaholic: "/projects/persaholic.jpg",
  EchoBank: "/projects/echobank.jpg",
  Parachute: "/projects/parachute.jpg",
};

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="project-actions">
      <details className="project-details">
        <summary>Project details <ChevronDown size={14} aria-hidden="true" /></summary>
        <div className="project-detail-body"><ul>{project.details.map(d => <li key={d}>{d}</li>)}</ul></div>
      </details>
      {project.href && <a className="text-link project-visit" href={project.href} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}>Visit site<ArrowUpRight size={15} aria-hidden="true" /></a>}
    </div>
  );
}

function ProjectComposition({ project, number, featured = false }: { project: Project; number: string; featured?: boolean }) {
  return (
    <li className={`project-composition ${featured ? "project-feature" : "project-support"}`}>
      <a className="project-media edge-light" href={project.href} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}>
        <img src={images[project.name]} alt={`Website preview of ${project.name}`} width={project.name === "EchoBank" ? 1440 : 1280} height={project.name === "EchoBank" ? 1050 : 800} loading="lazy" />
        <span className="frame-visit" aria-hidden="true"><ArrowUpRight size={20} /></span>
      </a>
      <div className="project-caption">
        <span className="project-number">{number}</span>
        <div className="project-heading"><h3><a href={project.href} target="_blank" rel="noreferrer">{project.name === "Persaholic" ? "PERSAHOLIC" : project.name}</a></h3><p className="project-category">{project.tag}</p></div>
        <p className="project-summary">{project.summary}</p>
      </div>
      <ProjectDetails project={project} />
      {featured && <p className="project-footnote"><span className="footnote-marker" aria-hidden="true" />7.8% waitlist conversion in the first 48 hours.</p>}
    </li>
  );
}

export function ProjectsSection() {
  const ask = useServerFn(askAboutProjects);
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(question: string) {
    if (!question.trim() || loading) return;
    setLoading(true);
    setAnswer("");
    setError("");
    try {
      const r = await ask({ data: { question } });
      setAnswer(r.answer);
      setError(r.error);
    } catch {
      setError("The assistant is unavailable right now.");
    } finally {
      setLoading(false);
    }
  }

  const featured = projects.find(p => p.name === "Persaholic")!;
  const echo = projects.find(p => p.name === "EchoBank")!;
  const parachute = projects.find(p => p.name === "Parachute")!;
  const city = projects.find(p => p.name === "Stalled London")!;
  return (
    <section id="projects" className="page-section projects-section" aria-labelledby="projects-heading">
      <div className="section-header"><h2 id="projects-heading">Selected work</h2><span className="eyebrow">01 — 04</span></div>
      <ul className="project-editorial-grid">
        <ProjectComposition project={featured} number="01" featured />
        <ProjectComposition project={echo} number="02" />
        <ProjectComposition project={parachute} number="03" />
        <li className="project-index">
          <span className="project-number">04</span>
          <div className="project-heading"><h3>{city.name}</h3><p className="project-category">{city.tag}</p></div>
          <div className="project-index-copy"><p className="project-summary">{city.summary}</p><ProjectDetails project={city} /></div>
        </li>
      </ul>

      <div className="project-qa mt-8 border border-border p-5">
        <h3 className="font-serif text-2xl">Ask about my projects</h3>
        <p className="mt-1 text-sm text-muted-foreground">Answers come only from the project details above.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["What is Parachute?", "How did Persaholic grow?", "Who is EchoBank for?"].map((s) => (
            <button key={s} type="button" onClick={() => { setQ(s); submit(s); }} className="border border-border px-3 py-1 text-xs hover:bg-muted">
              {s}
            </button>
          ))}
        </div>
        <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); submit(q); }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            maxLength={500}
            placeholder="Ask a question…"
            aria-label="Ask a question about Nika's projects"
            className="min-w-0 flex-1 border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
          />
          <Button type="submit" disabled={loading || !q.trim()} className="rounded-none" aria-label="Send question">
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
          </Button>
        </form>
        {(answer || error || loading) && (
          <p aria-live="polite" className={`mt-4 text-sm leading-relaxed ${error ? "text-destructive" : ""}`}>
            {loading ? "Thinking…" : error || answer}
          </p>
        )}
      </div>
    </section>
  );
}
