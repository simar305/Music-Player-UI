import { useEffect, useState } from "react";

export default function SongList({ songs, currentId, onPick, loading }) {
    if (loading) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-14 rounded-xl bg-white/10 animate-pulse"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {songs.map((s) => (
                <SongRow
                    key={s.id}
                    song={s}
                    active={s.id === currentId}
                    onPick={onPick}
                />
            ))}
        </div>
    );
}

function SongRow({ song, active, onPick }) {
    const [duration, setDuration] = useState(song.duration);

    useEffect(() => {
        if (song.duration) return;
        const audio = new Audio(song.url);
        audio.addEventListener("loadedmetadata", () => {
            setDuration(audio.duration);
        });

        return () => audio.remove();
    }, [song.url, song.duration]);

    return (
        <button
            onClick={() => onPick(song.id)}
            className={`w-full text-left flex items-center justify-between rounded-xl px-3 py-2 transition ${active ? "bg-white/15" : "hover:bg-white/10"
                }`}
        >
            <div className="flex items-center gap-3">
                <img
                    src={`https://cms.samespace.com/assets/${song.cover}`}
                    alt={song.title}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <div className="text-[18px] leading-tight">{song.name}</div>
                    <div className="text-[14px] text-neutral-300">{song.artist}</div>
                </div>
            </div>
            <div className="text-xs text-neutral-300">
                {formatTime(duration)}
            </div>
        </button>
    );
}

function formatTime(sec) {
    if (!Number.isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}
