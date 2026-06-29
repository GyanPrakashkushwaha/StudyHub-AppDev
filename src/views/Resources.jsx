import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   DATA — IMPORTANT DATES
   ═══════════════════════════════════════════════════════════ */
const importantDates = [
  {
    label: "Quiz 1",
    date: "July 19, 2026",
    day: "Sunday",
    color: "cyan",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    label: "Quiz 2",
    date: "August 16, 2026",
    day: "Sunday",
    color: "indigo",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    label: "End Term",
    date: "September 13, 2026",
    day: "Sunday",
    color: "violet",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84 51.39 51.39 0 00-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════
   DATA — ASSESSMENT TABLE
   ═══════════════════════════════════════════════════════════ */
const assessmentRows = [
  {
    type: "Lab Assignments",
    weeks: "Weeks 2–7",
    method: "Auto-evaluated via framework",
    proctoring: "None",
    contribution: "GLA: 70% of Best 2 out of [2,3,4,5,6] + 30% of Week 7",
  },
  {
    type: "Objective Assignments",
    weeks: "Weeks 1–12",
    method: "100% Objective",
    proctoring: "None",
    contribution: "None (eligibility only)",
  },
  {
    type: "Quiz 1 & Quiz 2",
    weeks: "Jul 19 & Aug 16",
    method: "Objective",
    proctoring: "In-person at TCS centers",
    contribution: "Qz1, Qz2",
  },
  {
    type: "End Sem Exam",
    weeks: "Sep 13",
    method: "Objective",
    proctoring: "In-person at TCS centers",
    contribution: "F",
  },
];

/* ═══════════════════════════════════════════════════════════
   DATA — WEEK-BY-WEEK RESOURCES
   ═══════════════════════════════════════════════════════════ */
const weeklyResources = [
  {
    week: 1,
    title: "Basic Terminologies of Web",
    icon: "🌐",
    files: [
      { name: "TW1 — Intro to Applications (TA Notes)", path: "/resources/TW1 Intro to Applications_TAsept2025.pdf", type: "pdf" },
      { name: "Week 1 — Annotation Notes", path: "/resources/Week1/Week 1-annotation.pdf", type: "pdf" },
    ],
  },
  {
    week: 2,
    title: "Webpages Written in HTML & CSS",
    icon: "🎨",
    files: [
      { name: "TW2 — Characteristics & Types of Applications + PYQ", path: "/resources/TW2 Characteristics & Types of Applications 1+PYQ.pdf", type: "pdf" },
    ],
  },
  {
    week: 3,
    title: "Presentation Layer — View",
    icon: "🖥️",
    files: [
      { name: "TW3 — Network Architectures", path: "/resources/TW3 Network Architectures 1.pdf", type: "pdf" },
    ],
  },
  {
    week: 4,
    title: "Models — Introduction to Databases",
    icon: "🗄️",
    files: [
      { name: "TW4 — Model-View-Controller", path: "/resources/TW4 Model-View-Controller 1.pdf", type: "pdf" },
      { name: "SQLAlchemy Foreign Keys Guide", path: "/resources/SQLalchemy foreign.pdf", type: "pdf" },
    ],
  },
  {
    week: 5,
    title: "Controllers — Business Logic",
    icon: "⚙️",
    files: [],
  },
  {
    week: 6,
    title: "APIs and REST APIs",
    icon: "🔗",
    files: [],
  },
  {
    week: 7,
    title: "Backend Systems",
    icon: "🏗️",
    files: [
      { name: "Week 7 — TA Notes", path: "/resources/Week 7/Week7_TA_notes.pdf", type: "pdf" },
    ],
  },
  {
    week: 8,
    title: "Application Frontend",
    icon: "✨",
    files: [
      { name: "TW8 — Frontend (Annotated)", path: "/resources/TW8 Frontend_annotation.pdf", type: "pdf" },
    ],
  },
  {
    week: 9,
    title: "Application Security",
    icon: "🔒",
    files: [
      { name: "TW9 — Security Notes", path: "/resources/Week 9/TW9 Security-pdfux-add-blank.pdf", type: "pdf" },
      { name: "MAD1 Security Diagram", path: "/resources/Week 9/MAD1_security.png", type: "image" },
      { name: "login.py — Authentication Example", path: "/resources/Week 9/login.py", type: "code" },
    ],
  },
  {
    week: 10,
    title: "Testing of Web Applications",
    icon: "🧪",
    files: [
      { name: "TW10 — Application Testing", path: "/resources/Week 10/TW10 Application Testing.pdf", type: "pdf" },
      { name: "main_test.py — Test Runner", path: "/resources/Week 10/main_test.py", type: "code" },
      { name: "test_students.py — Sample Tests", path: "/resources/Week 10/test_students.py", type: "code" },
    ],
  },
  {
    week: 11,
    title: "HTML Evolution & Beyond HTML",
    icon: "🚀",
    files: [
      { name: "TW11 — Beyond HTML", path: "/resources/Week 11/TW11 Beyond HTML 1.pdf", type: "pdf" },
      { name: "DOM.html — DOM Example", path: "/resources/Week 11/DOM.html", type: "code" },
      { name: "js.html — JavaScript Basics", path: "/resources/Week 11/js.html", type: "code" },
      { name: "shadow_DOM.html — Shadow DOM", path: "/resources/Week 11/shadow_DOM.html", type: "code" },
      { name: "template_slot.html — Template & Slots", path: "/resources/Week 11/template_slot.html", type: "code" },
      { name: "web_components.html — Web Components", path: "/resources/Week 11/web_components.html", type: "code" },
      { name: "javascript.ipynb — JS Notebook", path: "/resources/Week 11/javascript.ipynb", type: "notebook" },
    ],
  },
  {
    week: 12,
    title: "Application Deployment",
    icon: "☁️",
    files: [
      { name: "TW12 — Deployment (PDF)", path: "/resources/Week 12/TW12 Deployment.pdf", type: "pdf" },
      { name: "TW12 — Deployment Notes", path: "/resources/Week 12/TW12 Deployment.md", type: "doc" },
      { name: "CI/CD Pipeline Guide", path: "/resources/Week 12/CI-CD.md", type: "doc" },
      { name: "Git Comprehensive Guide", path: "/resources/Week 12/git.md", type: "doc" },
      { name: "Centralized vs Distributed VCS", path: "/resources/Week 12/cetralised-distributed-version-constrol-system.md", type: "doc" },
      { name: "Deployment & Release Notes", path: "/resources/Week 12/deployement-release.md", type: "doc" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   DATA — PYQs
   ═══════════════════════════════════════════════════════════ */
const pyqResources = [
  {
    label: "Quiz 1",
    items: [
      { name: "Quiz 1 — Sept 2024 Code Files", path: "/resources/PYQs/QUIZ1Sept2024codes.zip", type: "zip" },
    ],
  },
  {
    label: "Quiz 2",
    items: [
      { name: "Quiz 2 — Sept 2024 Code Files", path: "/resources/PYQs/Quiz2_sept2024_codes.zip", type: "zip" },
    ],
  },
  {
    label: "End Term",
    items: [
      { name: "MAD1 Jan 2025 PYQ (Unanswered)", path: "/resources/PYQs/MAD1_Jan2025_PYQ_without_answers.pdf", type: "pdf" },
      { name: "MAD1 Jan 2025 PYQ (Annotated)", path: "/resources/PYQs/MAD1_Jan2025_PYQ_without_answers_annotated.pdf", type: "pdf" },
      { name: "MAD1 Sept 2024 PYQ (Annotated)", path: "/resources/PYQs/MAD1_Sept2024_PYQ_annotated.pdf", type: "pdf" },
      { name: "ET Jan 2025 Code Files", path: "/resources/PYQs/ET_Jan2025.zip", type: "zip" },
      { name: "ET Sept 2024 Code Files", path: "/resources/PYQs/ET_Sept2024_MAD1.zip", type: "zip" },
      { name: "Calculations Reference", path: "/resources/PYQs/Calculations.pdf", type: "pdf" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   HELPER — file type badge
   ═══════════════════════════════════════════════════════════ */
const fileTypeConfig = {
  pdf: { label: "PDF", classes: "bg-red-500/12 text-red-400 border-red-500/20", icon: DocIcon },
  code: { label: "Code", classes: "bg-emerald-500/12 text-emerald-400 border-emerald-500/20", icon: CodeIcon },
  doc: { label: "Markdown", classes: "bg-sky-500/12 text-sky-400 border-sky-500/20", icon: DocIcon },
  image: { label: "Image", classes: "bg-amber-500/12 text-amber-400 border-amber-500/20", icon: ImageIcon },
  notebook: { label: "Notebook", classes: "bg-orange-500/12 text-orange-400 border-orange-500/20", icon: CodeIcon },
  zip: { label: "ZIP", classes: "bg-fuchsia-500/12 text-fuchsia-400 border-fuchsia-500/20", icon: ArchiveIcon },
};

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */
function Resources() {
  const [expandedWeeks, setExpandedWeeks] = useState(new Set());
  const [expandAll, setExpandAll] = useState(false);

  const toggleWeek = (week) => {
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(week)) next.delete(week);
      else next.add(week);
      return next;
    });
  };

  const handleExpandAll = () => {
    if (expandAll) {
      setExpandedWeeks(new Set());
    } else {
      setExpandedWeeks(new Set(weeklyResources.map((w) => w.week)));
    }
    setExpandAll(!expandAll);
  };

  const totalFiles = weeklyResources.reduce((sum, w) => sum + w.files.length, 0);

  return (
    <main className="min-h-screen bg-slate-950 overflow-hidden">
      {/* ────────────────────────────────────────
          HERO
      ──────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/5 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-violet-500/6 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm mb-6">
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <span className="text-sm text-slate-300 font-medium">
              {totalFiles}+ Downloadable Resources
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Course Resources
            </span>
          </h1>
          <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need — grading policies, weekly notes, code examples, and previous year papers — all in one place.
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────
          IMPORTANT DATES
      ──────────────────────────────────────── */}
      <section className="relative pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {importantDates.map((d) => (
              <div
                key={d.label}
                className={`group relative p-5 rounded-2xl border transition-all duration-300 bg-${d.color}-500/[0.03] border-${d.color}-500/15 hover:bg-${d.color}-500/[0.06] hover:border-${d.color}-500/25`}
                /* Tailwind JIT: all color classes pre-declared below */
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                    d.color === "cyan" ? "from-cyan-500 to-blue-600 text-white" :
                    d.color === "indigo" ? "from-indigo-500 to-purple-600 text-white" :
                    "from-violet-500 to-fuchsia-600 text-white"
                  } shadow-lg`}>
                    {d.icon}
                  </div>
                  <span className={`text-xs font-semibold tracking-widest uppercase ${
                    d.color === "cyan" ? "text-cyan-400" :
                    d.color === "indigo" ? "text-indigo-400" :
                    "text-violet-400"
                  }`}>
                    {d.label}
                  </span>
                </div>
                <p className="text-lg font-bold text-white">{d.date}</p>
                <p className="text-sm text-slate-500 mt-0.5">{d.day} · In-person at TCS Centers</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          WEEKLY RESOURCES ACCORDION
      ──────────────────────────────────────── */}
      <section id="weekly-resources" className="relative py-16 sm:py-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Downloads"
            title="Weekly Resources"
            description="TA notes, code examples, and reference materials organized by week."
          />

          {/* Expand all + revision banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <button
              onClick={handleExpandAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all duration-200 cursor-pointer"
            >
              <svg className={`w-4 h-4 transition-transform duration-300 ${expandAll ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
              {expandAll ? "Collapse All" : "Expand All"}
            </button>

            {/* Revision material highlight */}
            <a
              href="/resources/W1-W6_EndTermRevision.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-300 hover:text-amber-200 hover:border-amber-500/30 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              W1–W6 End Term Revision PDF
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {weeklyResources.map((week) => {
              const isOpen = expandedWeeks.has(week.week);
              const hasFiles = week.files.length > 0;

              return (
                <div
                  key={week.week}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "bg-white/[0.03] border-white/[0.1] shadow-[0_0_30px_rgba(0,0,0,0.2)]"
                      : "bg-white/[0.015] border-white/[0.06] hover:bg-white/[0.025] hover:border-white/[0.08]"
                  }`}
                >
                  {/* Accordion header */}
                  <button
                    onClick={() => hasFiles && toggleWeek(week.week)}
                    className={`w-full flex items-center gap-4 p-5 text-left ${
                      hasFiles ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <span className={`flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl text-lg transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20"
                        : "bg-white/[0.05]"
                    }`}>
                      {week.icon}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold tracking-wider uppercase transition-colors ${
                          isOpen ? "text-cyan-400" : "text-slate-500"
                        }`}>
                          Week {week.week}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/[0.04] text-slate-500 border border-white/[0.06]">
                          {week.files.length} {week.files.length === 1 ? "file" : "files"}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-200 mt-0.5 truncate">
                        {week.title}
                      </p>
                    </div>

                    {hasFiles && (
                      <svg
                        className={`w-5 h-5 text-slate-500 transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Accordion content */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-5 pt-0">
                      <div className="border-t border-white/[0.06] pt-4 flex flex-col gap-2">
                        {week.files.map((file, idx) => {
                          const config = fileTypeConfig[file.type] || fileTypeConfig.doc;
                          const Icon = config.icon;
                          return (
                            <a
                              key={idx}
                              href={file.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/file flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08] transition-all duration-200"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                                <Icon />
                              </div>
                              <span className="flex-1 text-sm text-slate-300 group-hover/file:text-white transition-colors truncate">
                                {file.name}
                              </span>
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${config.classes} flex-shrink-0`}>
                                {config.label}
                              </span>
                              <svg className="w-4 h-4 text-slate-600 group-hover/file:text-cyan-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          PYQs
      ──────────────────────────────────────── */}
      <section id="pyqs" className="relative py-16 sm:py-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Practice"
            title="Previous Year Questions"
            description="Solved papers, code files, and calculation references from past terms."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pyqResources.map((category) => (
              <div
                key={category.label}
                className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase ${
                    category.label === "Quiz 1"
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      : category.label === "Quiz 2"
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      : "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20"
                  }`}>
                    {category.label}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {category.items.length} {category.items.length === 1 ? "file" : "files"}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {category.items.map((item, idx) => {
                    const config = fileTypeConfig[item.type] || fileTypeConfig.pdf;
                    const Icon = config.icon;
                    return (
                      <a
                        key={idx}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/pyq flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08] transition-all duration-200"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                          <Icon />
                        </div>
                        <span className="flex-1 text-xs text-slate-400 group-hover/pyq:text-slate-200 transition-colors leading-snug">
                          {item.name}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${config.classes} flex-shrink-0`}>
                          {config.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Reusable section heading ─── */
function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="text-center mb-14 sm:mb-16">
      {eyebrow && (
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

/* ─── File type icons ─── */
function DocIcon() {
  return (
    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

export default Resources;
