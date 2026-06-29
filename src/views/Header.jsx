import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/resources", label: "Resources" },
  { to: "/live-sessions", label: "Live Sessions" },
  { to: "/contribute", label: "Contribute" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 py-0 flex items-center justify-between h-16">
        {/* ── Brand / Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group select-none"
        >
          {/* Animated gradient icon */}
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-shadow duration-500">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            {/* Subtle pulse ring */}
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500" />
          </span>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            StudyHub
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ease-out ${
                    isActive
                      ? "text-cyan-300 bg-cyan-500/10 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.15)]"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {/* Active indicator dot */}
                    <span
                      className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 transition-all duration-300 ${
                        isActive ? "w-5 opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          <button className="relative group px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer overflow-hidden">
            <span className="relative z-10">Get Started</span>
            {/* Hover shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors duration-200 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <div className="w-5 flex flex-col gap-[5px]">
            <span
              className={`block h-[2px] rounded-full bg-current transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] rounded-full bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] rounded-full bg-current transition-all duration-300 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* ── Mobile Menu Panel ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-6 pt-2 border-t border-white/[0.04]">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 ${
                      isActive
                        ? "text-cyan-300 bg-cyan-500/10 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.12)]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <button className="w-full px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-transform duration-200 cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;