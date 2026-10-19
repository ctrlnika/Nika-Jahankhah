"""Generate the public CV from approved portfolio facts, never from hidden source layers."""
from pathlib import Path
import math
import re
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import Color
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether

ROOT = Path(__file__).resolve().parents[2]
for name in ("Editorial", "Body", "BodyBold"):
    pdfmetrics.registerFont(TTFont(name, str(Path(__file__).parent / (name + ".ttf"))))
pdfmetrics.registerFontFamily("Body", normal="Body", bold="BodyBold", italic="Body", boldItalic="BodyBold")

def token(name):
    css = (ROOT / "src/styles.css").read_text().split(".dark {")[0]
    alias = re.search(r"--" + re.escape(name) + r":\s*var\(--([^)]+)\)", css)
    if alias:
        return token(alias.group(1))
    match = re.search(r"--" + re.escape(name) + r":\s*oklch\(([^)]+)\)", css)
    if not match:
        raise ValueError(name)
    light, chroma, hue = map(float, match.group(1).split())
    a, b = chroma * math.cos(math.radians(hue)), chroma * math.sin(math.radians(hue))
    l, m, s = (light + .3963377774*a + .2158037573*b)**3, (light - .1055613458*a - .0638541728*b)**3, (light - .0894841775*a - 1.291485548*b)**3
    channels = (4.0767416621*l - 3.3077115913*m + .2309699292*s, -1.2684380046*l + 2.6097574011*m - .3413193965*s, -.0041960863*l - .7034186147*m + 1.707614701*s)
    def srgb(v):
        return max(0, min(1, 12.92*v if v <= .0031308 else 1.055*v**(1/2.4)-.055))
    return Color(*map(srgb, channels))

ink, muted, accent, paper, border = map(token, ("foreground", "muted-foreground", "accent", "background", "border"))
styles = {
    "name": ParagraphStyle("name", fontName="Editorial", fontSize=38, leading=43, textColor=ink, spaceAfter=8),
    "role": ParagraphStyle("role", fontName="Body", fontSize=10, leading=14, textColor=accent, spaceAfter=8),
    "body": ParagraphStyle("body", fontName="Body", fontSize=9.5, leading=13.5, textColor=ink, spaceAfter=5),
    "meta": ParagraphStyle("meta", fontName="Body", fontSize=8.5, leading=12, textColor=muted, spaceAfter=5),
    "section": ParagraphStyle("section", fontName="BodyBold", fontSize=9, leading=13, textColor=accent, spaceBefore=16, spaceAfter=9),
    "title": ParagraphStyle("title", fontName="Editorial", fontSize=16, leading=20, textColor=ink, spaceAfter=3),
}

def p(text, style="body"):
    return Paragraph(text, styles[style])

def link(label, url):
    return f'<link href="{url}" color="{accent.hexval()}"><u>{label}</u></link>'

story = []
def section(title):
    story.append(p(title.upper(), "section"))

def entry(title, meta, details):
    story.append(KeepTogether([p(title,"title"), p(meta,"meta"), *[p(t) for t in details], Spacer(1,5)]))

story += [p("Nika Jahankhah", "name"), p("Software Engineer · Product UX/UI Designer", "role"), p(" · ".join([link("nika@hamid.com", "mailto:nika@hamid.com"), link("hamid.com", "https://hamid.com"), link("github.com/ctrlnika", "https://github.com/ctrlnika"), "London, UK"]), "meta")]
section("Education")
entry("BSc (Hons) Computer Science", "City St George’s, University of London · Sep 2025 – Jun 2028 (expected)", ["<b>Notable coursework:</b> Geometric Algorithms 83.3% · Operating Systems 79% · Discrete Mathematics for Computing 71.1% · Programming in Java 67.5%"])
section("Experience")
entry("Founder &amp; Lead Full-Stack Engineer", link("PERSAHOLIC", "https://persaholic.com") + " · Sep 2026 – Present · London", ["Achieved <b>7.8% waitlist conversion</b> within 48 hours, peaking at <b>14 signups per week</b> without paid advertising.", "Generated <b>12,374 organic Instagram impressions</b> and <b>350+ unique site visits</b> from 12 Sep–5 Oct 2026; 76% mobile traffic and 1.4 pages per session.", "Built an email signup system using SQL and serverless cloud infrastructure."])
entry("Software Engineer and Tester", "unicompute · Mar 2026 – Present · London", ["Built the TypeScript frontend and designed graphical assets, including the logo, for " + link("okzulu.com", "https://okzulu.com") + ". Tested across development, alpha, beta, UAT and production."])
entry("Pathways to Progress Programme Participant", "Generating Genius · PDT Partners × National Grid · 2026", ["Participated in a finance hackathon at PDT Partners using the yfinance API. Selected for a National Grid mock interview."])
entry("Financial Lines Group Intern", "Howden · Jun – Jul 2025 · London", ["Improved data accuracy across <b>9,988 insurance claims</b> by restructuring and validating Excel workbooks. Tracked bot-generated errors and validated open claims across teams."])
entry("Education &amp; Employability Administrative Assistant", "Light Project Pro International · Jul 2024 – Jul 2025 · London", ["Coordinated stakeholder communications, scheduling and documentation for an employability cohort of 100."])
entry("Tech Futures Intern", "Ernst &amp; Young · Mar – Apr 2024 · London", ["Developed Python skills using EY.ai tools and hosted a panel with three technology professionals. Received the <b>Rising Star award</b> and contributed to the winning pitch."])
story += [PageBreak(), p("Selected work &amp; community", "name"), p("Nika Jahankhah · October 2026", "meta")]
section("Projects & civic technology")
entry("Stalled London", "House London #0 · Newspeak House · 2026", ["Created a civic data platform mapping stalled real-estate developments across London’s boroughs, using curated open-government registries and problem briefs.", "Built under the guidance of event host Jamie Coombes at Newspeak House. Coombes later highlighted participating teams in a public project review on London’s housing crisis."])
entry("EchoBank", "Group project · React 19, TypeScript, TanStack Start, PostgreSQL · Sep 2026", ["Built a voice-first banking app for Generating Genius, enabling visually impaired users to check balances, review transactions and send money using speech.", "Implemented authentication, row-level security, AI card reading and scam-risk detection, with audio navigation and hold-to-confirm payments."])
entry(link("Parachute", "https://parachute2.lovable.app"), "Solo project · TypeScript, React, TanStack · Jul 2026", ["Built an AI safety gateway to intercept and repair unsafe replies in grief, legal and crisis contexts, with an MCP server exposing five tools.", "Designed <b>13 safety policies across seven domains</b>, tested against a <b>21-case adversarial suite</b>."])
section("Community & achievements")
entry("Tech, Tea &amp; Biscuits", "Jan – Aug 2024", ["Helped older residents with digital accessibility needs navigate online services."])
story += [p("<b>Data Science &amp; Artificial Intelligence Society:</b> Outreach Ambassador · Oct 2026 – Jun 2027"), p("<b>City MMA Club:</b> Competing Member · Oct 2026 – Jun 2027"), p("<b>Achievements:</b> Second place in all three hackathons entered.")]
section("Toolkit & certifications")
story += [p("<b>Languages:</b> Python, TypeScript, JavaScript, HTML, CSS, C++, Java, SQL"), p("<b>Technologies:</b> React Native, Git, Excel, Microsoft 365, Access, IntelliJ, Visual Studio Code"), p("<b>Certifications:</b> CompTIA ITF+, Microsoft Excel MO-200, ConnectWise PSA, Device Configuration"), p("<b>Languages spoken:</b> English (native), Persian (native), Spanish (proficient)")]

def page(canvas, doc):
    w, h = A4
    canvas.saveState()
    canvas.setFillColor(paper)
    canvas.rect(0, 0, w, h, fill=1, stroke=0)
    canvas.setStrokeColor(accent)
    canvas.setLineWidth(1)
    canvas.line(42, h-28, w-42, h-28)
    canvas.setStrokeColor(border)
    canvas.line(42, 37, w-42, 37)
    canvas.setFont("Body", 8)
    canvas.setFillColor(muted)
    canvas.drawString(42, 23, "HAMID.COM  /  CURRICULUM VITAE  /  OCTOBER 2026")
    canvas.drawRightString(w-42, 23, f"{doc.page:02d}")
    canvas.restoreState()

output = ROOT / "public/Nika-Jahankhah-CV.pdf"
SimpleDocTemplate(str(output), pagesize=A4, rightMargin=42, leftMargin=42, topMargin=43, bottomMargin=53, title="Nika Jahankhah — Curriculum Vitae", author="Nika Jahankhah", subject="Software engineering, product design and civic technology").build(story, onFirstPage=page, onLaterPages=page)
print(f"Created {output.name}")