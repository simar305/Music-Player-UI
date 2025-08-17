import { Menu } from "lucide-react";

export default function TopBar({ onMenu }) {
    return (
        <div className="md:hidden flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                    alt="logo"
                    className="w-7 h-7"
                />
                <span className="font-semibold text-lg">Spotify</span>
            </div>
            <button
                onClick={onMenu}
                className="p-2 rounded-lg bg-white/10 active:scale-95 transition"
                aria-label="Open songs menu"
            >
                <Menu size={22} />
            </button>
        </div>
    );
}
