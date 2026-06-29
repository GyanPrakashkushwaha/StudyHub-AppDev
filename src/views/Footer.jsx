import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/[0.06]">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/15">
              <svg
                className="w-4 h-4 text-white"
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
            </span>
            <span className="text-base font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              StudyHub
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/resources"
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              Resources
            </Link>
            <Link
              to="/live-sessions"
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              Live Sessions
            </Link>
            <a
              href="https://discourse.onlinedegree.iitm.ac.in/c/courses/mad1-kb/29"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              Discourse
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-slate-500">
            &copy; 2026 Gyan Prakash Kushwaha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
