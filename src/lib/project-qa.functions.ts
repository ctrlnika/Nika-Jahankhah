import { createServerFn } from "@tanstack/react-start";
import { projects } from "./projects";

export const askAboutProjects = createServerFn({ method: "POST" })
  .inputValidator((input: { question: string }) => {
    const q = String(input?.question ?? "").trim().slice(0, 500);
    if (!q) throw new Error("Please type a question.");
    return { question: q };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env['LOVABLE_API_KEY'];
    if (!apiKey) return { answer: "", error: "The assistant isn't set up yet." };
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText } = await import("ai");
    const openai = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    const facts = projects
      .map((p) => `## ${p.name} (${p.tag})${p.href ? ` — ${p.href}` : ""}\n${p.summary}\n- ${p.details.join("\n- ")}`)
      .join("\n\n");
    try {
      const result = streamText({
        model: openai.responses("openai/gpt-6-astra"),
        maxRetries: 0,
        system: `You answer visitor questions about Nika Jahankhah's projects on her portfolio. Nika studies BSc Computer Science at City St George's, University of London. Use ONLY the facts below. If the answer isn't there, say you don't know and suggest emailing nika@hamid.com. Be concise (2-4 sentences), warm, third person. Never invent links or numbers.\n\n${facts}`,
        prompt: data.question,
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });
      const answer = (await result.text).trim();
      return { answer, error: answer ? "" : "No answer came back — please try again." };
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode;
      console.error("project-qa", status, e);
      if (status === 429) return { answer: "", error: "Too many questions right now — try again in a minute." };
      if (status === 402) return { answer: "", error: "The assistant is paused for now." };
      return { answer: "", error: "The assistant is unavailable right now." };
    }
  });
