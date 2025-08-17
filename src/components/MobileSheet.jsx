export default function MobileSheet({ open, onClose, tab, setTab, query, setQuery, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden">
            <div className="absolute inset-x-0 bottom-0 h-[80%] rounded-t-2xl bg-neutral-900 p-4 shadow-card flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                            className="w-6 h-6"
                            alt="spotify"
                        />
                        <span className="font-semibold">Songs</span>
                    </div>
                    <button onClick={onClose} className="text-neutral-300">Close</button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-6 mt-4">
                    <button
                        onClick={() => setTab("for-you")}
                        className={`text-[16px] font-semibold ${tab === "for-you" ? "text-white" : "text-neutral-400"
                            }`}
                    >
                        For You
                    </button>
                    <button
                        onClick={() => setTab("top")}
                        className={`text-[16px] font-semibold ${tab === "top" ? "text-white" : "text-neutral-400"
                            }`}
                    >
                        Top Tracks
                    </button>
                </div>

                {/* Search */}
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 mt-3">
                    <svg viewBox="0 0 24 24" width="18" height="18" className="opacity-70">
                        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z" />
                    </svg>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Song, Artist"
                        className="bg-transparent outline-none text-sm placeholder-neutral-300 flex-1"
                    />
                </div>

                {/* List */}
                <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-2">
                    {children}
                </div>
            </div>
        </div>
    );
}
