import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward, SkipBack, MoreHorizontal, Volume2 } from "lucide-react";

export default function Player({ track, onPrev, onNext, autoPlay }) {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(!!autoPlay);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!audioRef.current) return;
        if (autoPlay) {
            audioRef.current.play().catch(() => { });
            setPlaying(true);
        } else {
            setPlaying(false);
        }
    }, [track?.id]);

    useEffect(() => {
        const el = audioRef.current;
        if (!el) return;
        if (playing) el.play().catch(() => { });
        else el.pause();
    }, [playing]);

    function onSeek(e) {
        const el = audioRef.current;
        if (!el || !Number.isFinite(el.duration)) return;
        const pct = Number(e.target.value);
        el.currentTime = (pct / 100) * el.duration;
        setProgress(pct);
    }

    function onTime(e) {
        const el = e.currentTarget;
        if (!Number.isFinite(el.duration)) return;
        setProgress((el.currentTime / el.duration) * 100);
    }

    return (
        <div className="flex flex-col items-center">
            {/* Title & Artist */}
            <div className="self-start px-2">
                <div className="text-2xl md:text-3xl font-bold leading-tight">{track?.name}</div>
                <div className="text-neutral-300 -mt-0.5">{track?.artist}</div>
            </div>

            {/* Artwork */}
            <img
                src={`https://cms.samespace.com/assets/${track?.cover}`}
                alt={track?.title}
                className="rounded-xl w-[260px] h-[260px] md:w-[420px] md:h-[420px] object-cover mt-4 shadow-2xl transition-transform duration-300"
            />

            {/* Seeker */}
            <div className="w-full max-w-[520px] mt-5 px-1">
                <input type="range" min="0" max="100" value={progress} onChange={onSeek} />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between w-full mt-3 px-4">
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MoreHorizontal size={20} />
                </button>
                <button
                    onClick={onPrev}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition"
                    aria-label="Previous"
                >
                    <SkipBack size={20} />
                </button>
                <button
                    onClick={() => setPlaying((p) => !p)}
                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center active:scale-95 transition"
                    aria-label={playing ? "Pause" : "Play"}
                >
                    {playing ? <Pause size={22} /> : <Play size={22} />}
                </button>
                <button
                    onClick={onNext}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition"
                    aria-label="Next"
                >
                    <SkipForward size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Volume2 size={20} />
                </button>
            </div>

            <audio
                ref={audioRef}
                src={track?.url}
                onTimeUpdate={onTime}
                onEnded={onNext}
                preload="auto"
            />
        </div>
    );
}