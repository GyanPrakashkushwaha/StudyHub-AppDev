import { useState } from "react";

/* ── Placeholder — replace with your actual email ── */
const TA_EMAIL = "gyanprakash.ta@example.com";

/* ── Resource categories for the form ── */
const categories = [
  "Week 1 — Basic Terminologies of Web",
  "Week 2 — HTML & CSS",
  "Week 3 — Presentation Layer (View)",
  "Week 4 — Models & Databases",
  "Week 5 — Controllers & Business Logic",
  "Week 6 — APIs & REST APIs",
  "Week 7 — Backend Systems",
  "Week 8 — Application Frontend",
  "Week 9 — Application Security",
  "Week 10 — Testing",
  "Week 11 — Beyond HTML",
  "Week 12 — Deployment",
  "PYQ — Previous Year Questions",
  "Project Help",
  "General / Other",
];

/* ── Guidelines data ── */
const guidelines = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Accepted Formats",
    description: "PDF notes, Python/HTML/JS code files, Markdown docs, Jupyter notebooks, images & diagrams.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: "What Helps Most",
    description: "Handwritten notes, solved examples, code snippets for lab assignments, or PYQ solutions.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Originality",
    description: "Please share only your original work or properly attributed content. No copyrighted material.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Credit",
    description: "You'll be credited on the Resources page when your contribution is added. Include your name!",
  },
];

/* ── How it works steps ── */
const steps = [
  {
    step: 1,
    title: "Fill the Form",
    description: "Enter your name, select the relevant week/category, and describe what you're sharing.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    step: 2,
    title: "Send via Email",
    description: "The form opens your email client with a pre-filled message. Just attach your files and hit send.",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    step: 3,
    title: "We Review & Add",
    description: "We'll review your submission and add it to the Resources page for everyone to benefit.",
    gradient: "from-violet-500 to-fuchsia-600",
  },
];

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */
function Contribute() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `[MAD-I Resource] ${category || "General"} — from ${name || "A Student"}`
    );
    const body = encodeURIComponent(
      `Hi,\n\nI'd like to contribute a resource for the MAD-I course.\n\n` +
      `Name: ${name}\n` +
      `Category: ${category}\n` +
      `Description: ${description}\n\n` +
      `[Please attach your file(s) to this email]\n\n` +
      `Thanks!`
    );

    window.open(`mailto:${TA_EMAIL}?subject=${subject}&body=${body}`, "_self");
    setSubmitted(true);

    // Reset after a delay
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setCategory("");
      setDescription("");
    }, 4000);
  };

  const isFormValid = name.trim() && category && description.trim();

  return (
    <main className="min-h-screen bg-slate-950 overflow-hidden">
      {/* ────────────────────────────────────────
          HERO
      ──────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-500/6 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-cyan-500/6 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm mb-6">
            <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-sm text-slate-300 font-medium">
              Community Contributions
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Share Your{" "}
            </span>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Resources
            </span>
          </h1>
          <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Got helpful notes, solved examples, or code snippets? Share them with your fellow students and help everyone succeed in MAD-I.
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────
          HOW IT WORKS
      ──────────────────────────────────────── */}
      <section className="relative pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-300 text-center group"
              >
                {/* Step number */}
                <div className={`inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br ${s.gradient} items-center justify-center shadow-lg mb-4 text-white text-lg font-bold`}>
                  {s.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {s.description}
                </p>

                {/* Connector arrow (hidden on last + mobile) */}
                {s.step < 3 && (
                  <div className="hidden sm:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          FORM + GUIDELINES
      ──────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* ── Form (3/5 width) ── */}
            <div className="lg:col-span-3">
              <div className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Submit a Resource</h2>
                    <p className="text-xs text-slate-500">Opens your email client with details pre-filled</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="contributor-name" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contributor-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="resource-category" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Category / Week <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="resource-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-200 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200 cursor-pointer"
                      >
                        <option value="" disabled className="bg-slate-900 text-slate-500">
                          Select a category…
                        </option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat} className="bg-slate-900 text-slate-200">
                            {cat}
                          </option>
                        ))}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="resource-description" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="resource-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Briefly describe the resource you're sharing (e.g., 'Solved Week 3 lab assignment with comments', 'Flask routing cheatsheet'…)"
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`group relative w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden cursor-pointer ${
                      isFormValid
                        ? "text-white bg-gradient-to-r from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-400/40 hover:scale-[1.02] active:scale-[0.98]"
                        : "text-slate-500 bg-white/[0.04] border border-white/[0.06] cursor-not-allowed"
                    }`}
                  >
                    {submitted ? (
                      <>
                        <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Email Client Opened!</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Compose Email & Attach Files</span>
                        <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </>
                    )}
                    {isFormValid && !submitted && (
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    )}
                  </button>

                  <p className="text-xs text-slate-600 text-center">
                    Don't forget to <strong className="text-slate-400">attach your file(s)</strong> in the email before sending.
                  </p>
                </form>
              </div>
            </div>

            {/* ── Guidelines (2/5 width) ── */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white mb-1">Submission Guidelines</h3>
              {guidelines.map((g, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center flex-shrink-0 text-violet-400 mt-0.5">
                      {g.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200 mb-1">
                        {g.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {g.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Direct email fallback */}
              <div className="mt-2 p-4 rounded-2xl bg-gradient-to-br from-violet-500/[0.05] to-fuchsia-500/[0.05] border border-violet-500/15">
                <p className="text-sm text-slate-300 mb-2 font-medium">
                  Prefer to email directly?
                </p>
                <a
                  href={`mailto:${TA_EMAIL}?subject=${encodeURIComponent("[MAD-I Resource] Contribution")}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {TA_EMAIL}
                </a>
                <p className="text-xs text-slate-500 mt-1.5">
                  Include the week number and a brief description in your email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          COMMUNITY BANNER
      ──────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 pb-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/8 to-pink-500/8" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-3xl" />

            <div className="relative px-8 py-14 sm:py-16 text-center">
              <div className="text-5xl mb-5">🤝</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Every Contribution Counts
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-6">
                Your notes could be the reason someone clears their exam. Help build a knowledge base that benefits everyone in the MAD-I course.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Reviewed by TAs
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Credit given
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Helps 100+ students
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contribute;
