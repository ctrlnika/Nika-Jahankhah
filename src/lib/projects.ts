export type Project = {
  name: string;
  tag: string;
  href: string;
  summary: string;
  details: string[];
};

export const projects: Project[] = [
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
