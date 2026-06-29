import { useState } from "react";
import { Link } from "react-router-dom";

/* ─── Week-by-week course highlights data ─── */
const courseWeeks = [
  { week: 1, title: "Basic Terminologies of Web", icon: "🌐" },
  { week: 2, title: "Webpages Written in HTML & CSS", icon: "🎨" },
  { week: 3, title: "Presentation Layer — View", icon: "🖥️" },
  { week: 4, title: "Models — Introduction to Databases", icon: "🗄️" },
  { week: 5, title: "Controllers — Business Logic", icon: "⚙️" },
  { week: 6, title: "APIs and REST APIs", icon: "🔗" },
  { week: 7, title: "Backend Systems", icon: "🏗️" },
  { week: 8, title: "Application Frontend", icon: "✨" },
  { week: 9, title: "Application Security", icon: "🔒" },
  { week: 10, title: "Testing of Web Applications", icon: "🧪" },
  { week: 11, title: "HTML Evolution & Beyond HTML", icon: "🚀" },
  { week: 12, title: "Application Deployment", icon: "☁️" },
];

/* ─── TA profiles ─── */
const taProfiles = [
  {
    name: "Gyan Prakash Kushwaha",
    role: "Teaching Assistant",
    bio: "Proficient in DSA and excited about Web Development.",
    avatar: "GP",
    gradient: "from-cyan-500 to-blue-600",
    github: "#",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Himanshu Rastogi",
    role: "Teaching Assistant",
    bio: "Standalone student with a great CGPA.",
    avatar: "HR",
    gradient: "from-indigo-500 to-purple-600",
    github: "#",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Yashvi Upadhyay",
    role: "Teaching Assistant",
    bio: "Intern at SGBC and maintains a great CGPA.",
    avatar: "YU",
    gradient: "from-violet-500 to-fuchsia-600",
    github: "#",
    linkedin: "#",
    twitter: "#",
  },
];

/* ─── Placeholder announcements ─── */
const announcements = [
  {
    id: 1,
    date: "June 28, 2026",
    title: "Welcome to MAD-I Term 2!",
    body: "We're excited to kick off the Modern Application Development course. Please make sure to join the Discourse forum and introduce yourself.",
    tag: "General",
    tagColor: "bg-cyan-500/15 text-cyan-300",
  },
  {
    id: 2,
    date: "June 25, 2026",
    title: "Week 1 Resources Published",
    body: "All slides, reading materials, and practice problems for Week 1 — Basic Terminologies of Web — are now available on the Resources page.",
    tag: "Resources",
    tagColor: "bg-indigo-500/15 text-indigo-300",
  },
  {
    id: 3,
    date: "June 22, 2026",
    title: "Live Session Schedule Released",
    body: "Check the Live Sessions page for the complete schedule of doubt-clearing and tutorial sessions throughout the term.",
    tag: "Sessions",
    tagColor: "bg-violet-500/15 text-violet-300",
  },
];

/* ─── Reusable section wrapper ─── */
function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">{children}</div>
    </section>
  );
}

/* ─── Section heading ─── */
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

/* ═══════════════════════════════════════════════════════════
   HOME COMPONENT
   ═══════════════════════════════════════════════════════════ */
function Home() {
  const [activeWeek, setActiveWeek] = useState(null);

  return (
    <main className="min-h-screen bg-slate-950 overflow-hidden">
      {/* ────────────────────────────────────────
          HERO SECTION
      ──────────────────────────────────────── */}
      <section className="relative isolate min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/8 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]" />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm mb-8 animate-[fadeInUp_0.6s_ease-out]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500" />
            </span>
            <span className="text-sm text-slate-300 font-medium">
              Term 2, 2026 — Now Live
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Modern Application
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Development — I
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
            Your one-stop hub for course resources, live sessions, and
            everything you need to master full-stack web development.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
            <Link
              to="/resources"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <svg
                className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>

            <a
              href="#course-highlights"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-slate-300 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all duration-300"
            >
              Explore Syllabus
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 sm:mt-20 flex justify-center animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-2.5 rounded-full bg-cyan-400/60" />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          COURSE HIGHLIGHTS
      ──────────────────────────────────────── */}
      <Section id="course-highlights">
        {/* Divider glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        <SectionHeading
          eyebrow="Syllabus"
          title="Course Highlights"
          description="12 weeks of structured learning covering the complete web development stack — from HTML basics to cloud deployment."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseWeeks.map((w) => (
            <button
              key={w.week}
              onMouseEnter={() => setActiveWeek(w.week)}
              onMouseLeave={() => setActiveWeek(null)}
              className={`group relative text-left p-5 rounded-2xl border transition-all duration-300 cursor-default ${
                activeWeek === w.week
                  ? "bg-cyan-500/[0.06] border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.08)]"
                  : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]"
              }`}
            >
              {/* Week number badge */}
              <div className="flex items-start gap-4">
                <span
                  className={`flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl text-lg transition-all duration-300 ${
                    activeWeek === w.week
                      ? "bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20"
                      : "bg-white/[0.05]"
                  }`}
                >
                  {w.icon}
                </span>
                <div className="min-w-0">
                  <span
                    className={`text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                      activeWeek === w.week
                        ? "text-cyan-400"
                        : "text-slate-500"
                    }`}
                  >
                    Week {w.week}
                  </span>
                  <p className="mt-0.5 text-sm font-medium text-slate-200 leading-snug">
                    {w.title}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* ────────────────────────────────────────
          QUICK LINKS
      ──────────────────────────────────────── */}
      <Section id="quick-links">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        <SectionHeading
          eyebrow="Quick Access"
          title="Important Links"
          description="Jump straight to the platforms you need."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Discourse Forum Card */}
          <a
            href="https://discourse.onlinedegree.iitm.ac.in/c/courses/mad1-kb/29"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-cyan-500/[0.04] hover:border-cyan-500/20 transition-all duration-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.06)]"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/30 transition-shadow duration-500 mb-5">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Discourse Forum
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Ask questions, share ideas, and collaborate with fellow students and TAs on the course discussion forum.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 group-hover:gap-2.5 transition-all duration-300">
              Visit Forum
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </span>
          </a>

          {/* Course Page Card */}
          <a
            href="https://seek.study.iitm.ac.in/courses/ns_26t2_cs2003"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-indigo-500/[0.04] hover:border-indigo-500/20 transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.06)]"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-400/30 transition-shadow duration-500 mb-5">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84 51.39 51.39 0 00-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Course Page</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Access official course content, lectures, assignments, and grading
              information on the SEEK platform.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 group-hover:gap-2.5 transition-all duration-300">
              Open Course
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </span>
          </a>
        </div>
      </Section>

      {/* ────────────────────────────────────────
          MEET THE TAs
      ──────────────────────────────────────── */}
      <Section id="meet-the-tas">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

        <SectionHeading
          eyebrow="Your Mentors"
          title="Meet the TAs"
          description="We're here to help you succeed. Don't hesitate to reach out!"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {taProfiles.map((ta) => (
            <div
              key={ta.name}
              className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 text-center"
            >
              {/* Avatar */}
              <div
                className={`inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br ${ta.gradient} items-center justify-center shadow-lg mb-5 text-white text-2xl font-bold tracking-wide`}
              >
                {ta.avatar}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{ta.name}</h3>
              <span className="text-xs font-medium text-cyan-400 tracking-wide uppercase">
                {ta.role}
              </span>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                {ta.bio}
              </p>

              {/* Social links */}
              <div className="mt-5 flex items-center justify-center gap-3">
                <a
                  href={ta.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                  aria-label={`${ta.name}'s GitHub`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={ta.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                  aria-label={`${ta.name}'s LinkedIn`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={ta.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                  aria-label={`${ta.name}'s Twitter`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ────────────────────────────────────────
          ANNOUNCEMENTS
      ──────────────────────────────────────── */}
      <Section id="announcements">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        <SectionHeading
          eyebrow="Updates"
          title="Announcements"
          description="Stay up to date with the latest course news and updates."
        />

        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {announcements.map((a) => (
            <article
              key={a.id}
              className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${a.tagColor}`}
                >
                  {a.tag}
                </span>
                <span className="text-xs text-slate-500">{a.date}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{a.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{a.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ────────────────────────────────────────
          BOTTOM CTA
      ──────────────────────────────────────── */}
      <Section id="bottom-cta" className="pb-24">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-violet-500/10" />
          <div className="absolute inset-0 border border-white/[0.06] rounded-3xl" />

          <div className="relative px-8 py-16 sm:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Dive into the course materials, connect with your peers, and build
              amazing web applications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/resources"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] overflow-hidden"
              >
                <span className="relative z-10">Browse Resources</span>
                <svg
                  className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
              <a
                href="https://discourse.onlinedegree.iitm.ac.in/c/courses/mad1-kb/29"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-slate-300 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all duration-300"
              >
                Join Discussion
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

export default Home;
