export default function Sidebar({ tab, setTab, query, setQuery, children }) {
    return (
        <aside className="hidden md:flex w-[360px] shrink-0 flex-col gap-6 px-6 py-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                    alt="spotify"
                    className="w-8 h-8"
                />
                <span className="text-xl font-semibold">Spotify</span>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6">
                <button
                    onClick={() => setTab("for-you")}
                    className={`text-[17px] font-semibold transition ${tab === "for-you" ? "text-white" : "text-neutral-400 hover:text-white"
                        }`}
                >
                    For You
                </button>
                <button
                    onClick={() => setTab("top")}
                    className={`text-[17px] font-semibold transition ${tab === "top" ? "text-white" : "text-neutral-400 hover:text-white"
                        }`}
                >
                    Top Tracks
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                <svg viewBox="0 0 24 24" width="18" height="18" className="opacity-70">
                    <path
                        fill="currentColor"
                        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
                    />
                </svg>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Song, Artist"
                    className="bg-transparent outline-none text-sm placeholder-neutral-300 flex-1"
                />
            </div>

            {/* List */}
            <div className="min-h-0 flex-1 overflow-y-auto pr-2">{children}</div>
        </aside>
    );
}
