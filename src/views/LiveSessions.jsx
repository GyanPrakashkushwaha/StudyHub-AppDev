import { useState, useEffect, useMemo } from "react";
import { parseCSV, parseSessionDate } from "../utils/csvParser";

/* ═══════════════════════════════════════════════════════════
   LIVE SESSIONS PAGE
   ═══════════════════════════════════════════════════════════ */
function LiveSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ── Filters ── */
  const [weekFilter, setWeekFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [taFilter, setTaFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Fetch & parse CSV ── */
  useEffect(() => {
    fetch("/data.csv")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load session data");
        return res.text();
      })
      .then((text) => {
        const rows = parseCSV(text);
        setSessions(rows);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  /* ── Derive filter options ── */
  const weeks = useMemo(() => {
    const set = new Set(sessions.map((s) => s["Week"]).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [sessions]);

  const types = useMemo(() => {
    const set = new Set(
      sessions.map((s) => s["Type of session"]).filter(Boolean)
    );
    return ["All", ...Array.from(set)];
  }, [sessions]);

  const tas = useMemo(() => {
    const set = new Set(sessions.map((s) => s["SME"]).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [sessions]);

  /* ── Today for next/previous split ── */
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  /* ── Next upcoming session ── */
  const nextSession = useMemo(() => {
    const upcoming = sessions
      .map((s) => ({ ...s, _date: parseSessionDate(s["Date"]) }))
      .filter((s) => s._date && s._date >= today)
      .sort((a, b) => a._date - b._date);
    return upcoming[0] || null;
  }, [sessions, today]);

  /* ── Previous session (most recent past) ── */
  const previousSession = useMemo(() => {
    const past = sessions
      .map((s) => ({ ...s, _date: parseSessionDate(s["Date"]) }))
      .filter((s) => s._date && s._date < today)
      .sort((a, b) => b._date - a._date);
    return past[0] || null;
  }, [sessions, today]);

  /* ── Previous session summary (latest that has a summary) ── */
  const previousSummary = useMemo(() => {
    const past = sessions
      .map((s) => ({ ...s, _date: parseSessionDate(s["Date"]) }))
      .filter(
        (s) => s._date && s._date < today && s["Session Summary"]?.trim()
      )
      .sort((a, b) => b._date - a._date);
    return past[0] || null;
  }, [sessions, today]);

  /* ── Filtered table data ── */
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      if (weekFilter !== "All" && s["Week"] !== weekFilter) return false;
      if (typeFilter !== "All" && s["Type of session"] !== typeFilter)
        return false;
      if (taFilter !== "All" && s["SME"] !== taFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const searchable = [
          s["Date"],
          s["Week"],
          s["Type of session"],
          s["SME"],
          s["Topics  covered"] || s["Topics covered"],
          s["Time"],
          s["Session Summary"],
          s["Resources"],
        ]
          .join(" ")
          .toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [sessions, weekFilter, typeFilter, taFilter, searchQuery]);

  /* ── Format Google Meet link ── */
  const formatMeetLink = (link) => {
    if (!link) return null;
    const url = link.startsWith("http") ? link : `https://${link}`;
    return url;
  };

  /* ── Loading / error states ── */
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading session data…</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-red-500/5 border border-red-500/20 max-w-md">
          <p className="text-red-400 font-medium mb-2">
            Failed to load data
          </p>
          <p className="text-sm text-slate-400">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 overflow-hidden">
      {/* ────────────────────────────────────────
          HERO / INTRO
      ──────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-indigo-500/6 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm text-slate-300 font-medium">
              {sessions.length} Sessions Scheduled
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Live Sessions
            </span>
          </h1>
          <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Join weekly TA sessions and doubt-clearing calls. All sessions are
            recorded — catch up anytime.
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────
          NEXT & PREVIOUS SESSION CARDS
      ──────────────────────────────────────── */}
      <section className="relative pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ── Next Session ── */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/[0.06] to-indigo-500/[0.04] border border-cyan-500/15 overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px]" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/20">
                    Up Next
                  </span>
                  {nextSession && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                      {nextSession["Type of session"]}
                    </span>
                  )}
                </div>

                {nextSession ? (
                  <>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {nextSession["Topics  covered"] ||
                        nextSession["Topics covered"] ||
                        "Session Scheduled"}
                    </h3>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400 mb-5">
                      <span className="flex items-center gap-1.5">
                        <CalendarIcon />
                        {nextSession["Date"]}, {nextSession["Weekday"]}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ClockIcon />
                        {nextSession["Time"]}
                      </span>
                      {nextSession["SME"] && (
                        <span className="flex items-center gap-1.5">
                          <UserIcon />
                          {nextSession["SME"]}
                        </span>
                      )}
                      {nextSession["Week"] && (
                        <span className="flex items-center gap-1.5">
                          <BookIcon />
                          {nextSession["Week"]}
                        </span>
                      )}
                    </div>
                    {nextSession["Gmeet link"] && (
                      <a
                        href={formatMeetLink(nextSession["Gmeet link"])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/35 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] overflow-hidden"
                      >
                        <span className="relative z-10">Join Session</span>
                        <svg
                          className="relative z-10 w-4 h-4"
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
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      </a>
                    )}
                  </>
                ) : (
                  <p className="text-slate-400 text-sm">
                    No upcoming sessions scheduled.
                  </p>
                )}
              </div>
            </div>

            {/* ── Previous Session + Summary ── */}
            <div className="flex flex-col gap-6">
              {/* Previous session */}
              <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.03] transition-colors duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                    Previous Session
                  </span>
                </div>

                {previousSession ? (
                  <>
                    <h4 className="text-base font-bold text-white mb-2">
                      {previousSession["Topics  covered"] ||
                        previousSession["Topics covered"] ||
                        "—"}
                    </h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <CalendarIcon />
                        {previousSession["Date"]}
                      </span>
                      {previousSession["SME"] && (
                        <span className="flex items-center gap-1.5">
                          <UserIcon />
                          {previousSession["SME"]}
                        </span>
                      )}
                      {previousSession["Week"] && (
                        <span className="flex items-center gap-1.5">
                          <BookIcon />
                          {previousSession["Week"]}
                        </span>
                      )}
                    </div>
                    {previousSession["Recording link"] &&
                      previousSession["Recording link"] !== "Recording" && (
                        <a
                          href={previousSession["Recording link"]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          <PlayIcon />
                          Watch Recording
                        </a>
                      )}
                  </>
                ) : (
                  <p className="text-slate-400 text-sm">No past sessions yet.</p>
                )}
              </div>

              {/* Previous session summary */}
              <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.03] transition-colors duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/20">
                    Session Summary
                  </span>
                </div>

                {previousSummary ? (
                  <>
                    <h4 className="text-base font-bold text-white mb-2">
                      {previousSummary["Topics  covered"] ||
                        previousSummary["Topics covered"] ||
                        "—"}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {previousSummary["Session Summary"]}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                      <span>{previousSummary["Date"]}</span>
                      {previousSummary["Number of participants"] && (
                        <span>
                          👥 {previousSummary["Number of participants"]}{" "}
                          participants
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-slate-400 text-sm">
                    No session summaries available yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          SESSION TABLE
      ──────────────────────────────────────── */}
      <section className="relative pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {/* Section heading */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
              All Sessions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Session Schedule
            </h2>
          </div>

          {/* ── Filters Bar ── */}
          <div className="mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search sessions…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200"
                />
              </div>

              {/* Week filter */}
              <FilterSelect
                label="Week"
                value={weekFilter}
                options={weeks}
                onChange={setWeekFilter}
              />

              {/* Type filter */}
              <FilterSelect
                label="Type"
                value={typeFilter}
                options={types}
                onChange={setTypeFilter}
              />

              {/* TA filter */}
              <FilterSelect
                label="TA"
                value={taFilter}
                options={tas}
                onChange={setTaFilter}
              />
            </div>

            {/* Active filter count */}
            {(weekFilter !== "All" ||
              typeFilter !== "All" ||
              taFilter !== "All" ||
              searchQuery.trim()) && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-slate-500">
                  Showing {filteredSessions.length} of {sessions.length} sessions
                </span>
                <button
                  onClick={() => {
                    setWeekFilter("All");
                    setTypeFilter("All");
                    setTaFilter("All");
                    setSearchQuery("");
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* ── Table ── */}
          <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      Week
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      Type
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      TA
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Topics
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      Time
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      Recording
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      Resources
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredSessions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-5 py-12 text-center text-slate-500"
                      >
                        No sessions match your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredSessions.map((s, i) => {
                      const sessionDate = parseSessionDate(s["Date"]);
                      const isPast = sessionDate && sessionDate < today;
                      const isToday =
                        sessionDate &&
                        sessionDate.toDateString() === today.toDateString();

                      return (
                        <tr
                          key={i}
                          className={`transition-colors duration-150 ${
                            isToday
                              ? "bg-cyan-500/[0.05]"
                              : "hover:bg-white/[0.02]"
                          }`}
                        >
                          {/* Date */}
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {isToday && (
                                <span className="flex h-2 w-2">
                                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-cyan-400 opacity-60" />
                                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
                                </span>
                              )}
                              <span
                                className={`text-sm ${
                                  isPast ? "text-slate-500" : "text-slate-200"
                                }`}
                              >
                                {s["Date"]}
                              </span>
                            </div>
                          </td>

                          {/* Week */}
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            {s["Week"] ? (
                              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/15">
                                {s["Week"]}
                              </span>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>

                          {/* Type */}
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                                s["Type of session"] === "TA Session"
                                  ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/15"
                                  : "bg-amber-500/10 text-amber-300 border border-amber-500/15"
                              }`}
                            >
                              {s["Type of session"]}
                            </span>
                          </td>

                          {/* TA */}
                          <td className="px-5 py-3.5 whitespace-nowrap text-sm text-slate-300">
                            {s["SME"] || (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>

                          {/* Topics */}
                          <td className="px-5 py-3.5 text-sm text-slate-300 max-w-[250px]">
                            {s["Topics  covered"] ||
                              s["Topics covered"] || (
                                <span className="text-slate-600">—</span>
                              )}
                          </td>

                          {/* Time */}
                          <td className="px-5 py-3.5 whitespace-nowrap text-sm text-slate-400">
                            {s["Time"] || (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>

                          {/* Recording */}
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            {s["Recording link"] &&
                            s["Recording link"] !== "Recording" ? (
                              <a
                                href={s["Recording link"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                              >
                                <PlayIcon />
                                Watch
                              </a>
                            ) : s["Recording link"] === "Recording" ? (
                              <span className="inline-flex items-center gap-1 text-sm text-slate-500">
                                <PlayIcon />
                                Pending
                              </span>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>

                          {/* Resources */}
                          <td className="px-5 py-3.5 whitespace-nowrap text-sm">
                            {s["Resources"] ? (
                              <span className="inline-flex items-center gap-1 text-violet-400 font-medium">
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                  />
                                </svg>
                                {s["Resources"]}
                              </span>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Row count */}
          <p className="mt-4 text-xs text-slate-500 text-right">
            {filteredSessions.length} session
            {filteredSessions.length !== 1 ? "s" : ""} shown
          </p>
        </div>
      </section>
    </main>
  );
}

/* ─── Small reusable components ─── */

function FilterSelect({ label, value, options, onChange }) {
  return (
    <div className="relative min-w-[140px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none pl-4 pr-9 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-200 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-slate-900 text-slate-200">
            {opt === "All" ? `${label}: All` : opt}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
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
    </div>
  );
}

/* ─── Icons ─── */

function CalendarIcon() {
  return (
    <svg
      className="w-4 h-4 text-slate-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="w-4 h-4 text-slate-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      className="w-4 h-4 text-slate-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      className="w-4 h-4 text-slate-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
      />
    </svg>
  );
}

export default LiveSessions;
