export type Project = {
  name: string;
  tag: string;
  href: string;
  summary: string;
  details: string[];
};

export const projects: Project[] = [
  {
    name: "Persaholic",
    tag: "Founder · Full-stack",
    href: "https://persaholic.com",
    summary: "A Persian-inspired direct-to-consumer brand with a bilingual site and cloud signup system.",
    details: [
      "Founder and lead full-stack engineer since September 2026.",
      "Built an SQL-backed serverless signup system; 7.8% waitlist conversion in the first 48 hours and a peak of 14 signups per week.",
      "12,374 organic Instagram impressions (12 Sep–5 Oct 2026); 76% mobile traffic, 1.4 pages per session.",
    ],
  },
  {
    name: "Stalled London",
    tag: "Civic data · Newspeak House",
    href: "",
    summary: "Maps stalled real-estate developments across London's boroughs to make housing challenges visible.",
    details: [
      "Built at House London #0, a civic hackathon at Newspeak House using curated government registries and problem briefs.",
      "The series was hosted by Jamie Coombes and co-created with Newspeak House founder Edward Saperia; Jamie featured the team in a public review on open-government data and London's housing crisis.",
    ],
  },
  {
    name: "EchoBank",
    tag: "Voice-first banking",
    href: "https://echobankapp.app",
    summary: "Voice-first banking for visually impaired users, built at a Generating Genius hackathon.",
    details: [
      "Built in September 2026 with React 19, TypeScript, TanStack Start and PostgreSQL; speech recognition and synthesis enable banking by voice.",
      "Implemented authentication, row-level security, AI card reading and scam-risk detection, with audio navigation and hold-to-confirm payments.",
    ],
  },
  {
    name: "Parachute",
    tag: "AI safety gateway",
    href: "https://parachute2.lovable.app",
    summary: "An AI safety gateway that checks agent actions against deterministic security policies.",
    details: [
      "Built in July 2026; exposes 5 MCP tools.",
      "Enforces 13 deterministic policies across 7 domains, validated by a 21-case test suite.",
    ],
  },
];
