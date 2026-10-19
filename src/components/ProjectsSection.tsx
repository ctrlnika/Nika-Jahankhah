import { HeritageDivider } from "@/components/HeritageDetail";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, AudioLines, Map, ChevronDown, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";
import { askAboutProjects } from "@/lib/project-qa.functions";
import persaholicShot from "@/assets/persaholic-preview.jpg.asset.json";
import parachuteShot from "@/assets/parachute-preview.jpg.asset.json";

const shots: Record<string, string> = {
  Persaholic: persaholicShot.url,
  Parachute: parachuteShot.url,
};

function Thumb({ name }: { name: string; href: string }) {
  const src = shots[name];
  return (
    <div className="flex h-full flex-col overflow-hidden border border-border bg-background">
      <div className="relative h-full min-h-0 flex-1 overflow-hidden">
        {src ? (
          <img src={src} alt={`Screenshot of the ${name} website`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className={`project-art ${name === "EchoBank" ? "project-art-voice" : "project-art-city"}`}>
            {name === "EchoBank" ? <AudioLines aria-hidden="true" /> : <Map aria-hidden="true" />}
            <span>{name === "EchoBank" ? "Voice-first banking" : "London · civic data"}</span>
          </div>
        )}
      </div>
    </div>
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

  return (
    <section id="projects" className="projects-section mt-16">
      <HeritageDivider />
      <h2 className="section-heading mb-6">Projects</h2>
      <ul className="project-grid">
        {projects.map((p) => (
          <li key={p.name} className="project-card group">
            <div className="project-heading">
              {p.href ? (
                <a href={p.href} target="_blank" rel="noreferrer" aria-label={`Visit ${p.name}`} className="project-thumb"><Thumb name={p.name} href={p.href} /></a>
              ) : (
                <div className="project-thumb"><Thumb name={p.name} href="" /></div>
              )}
              <div className="project-heading-copy">
                <h3 className="font-serif text-2xl leading-tight">{p.href ? <a className="project-title-link" href={p.href} target="_blank" rel="noreferrer">{p.name}<ArrowUpRight className="size-4" aria-hidden="true" /></a> : p.name}</h3>
                <span className="project-category">{p.tag}</span>
              </div>
            </div>
            <div className="project-copy">
              <p className="text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              <details className="group mt-auto pt-2">
                <summary className="project-disclosure">
                  Read more <ChevronDown className="size-3 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {p.details.map((d) => <li key={d}>— {d}</li>)}
                </ul>
              </details>
            </div>
          </li>
        ))}
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
