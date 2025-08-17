import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar.jsx";
import SongList from "./components/SongList.jsx";
import MobileSheet from "./components/MobileSheet.jsx";
import Player from "./components/Player.jsx";
import TopBar from "./components/TopBar.jsx";
import { extractAverageColor, rgbToCss } from "./utils/colorUtils";

const API = "https://cms.samespace.com/items/songs";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("for-you");
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgFrom, setBgFrom] = useState("rgb(34,22,14)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const current = songs[currentIndex];

  useEffect(() => {
    let active = true;
    setLoading(true);
    axios
      .get(API)
      .then((res) => {
        if (!active) return;
        const data = res?.data?.data || [];
        setSongs(data);
        setCurrentIndex(0);
      })
      .catch((e) => console.error(e))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  // Background gradient color from cover
  useEffect(() => {
    if (!current) return;
    const src = `https://cms.samespace.com/assets/${current.cover}`;
    extractAverageColor(src).then(([r, g, b]) => setBgFrom(rgbToCss(r, g, b)));
  }, [current?.cover]);

  // Filtered list (tab + search)
  const filtered = useMemo(() => {
    let list =
      tab === "top" ? songs.filter((s) => !!s.top_track) : songs.slice();
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter(
      (s) =>
        s.title?.toLowerCase().includes(q) ||
        s.artist?.toLowerCase().includes(q)
    );
  }, [songs, tab, query]);

  // helpers
  function pickById(id) {
    const idx = songs.findIndex((s) => s.id === id);
    if (idx >= 0) setCurrentIndex(idx);
  }
  function next() {
    if (!songs.length) return;
    setCurrentIndex((i) => (i + 1) % songs.length);
  }
  function prev() {
    if (!songs.length) return;
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col transition-[background] duration-700"
      style={{ background: `linear-gradient(180deg, ${bgFrom}, #000 65%)` }}
    >
      {/* Mobile Topbar (menu button) */}
      <TopBar onMenu={() => setMobileOpen(true)} />

      <div className="flex-1 w-full max-w-[1180px] mx-auto px-4 md:px-6 py-4 md:py-8">
        <div className="grid md:grid-cols-[360px_minmax(0,1fr)] gap-6">
          {/* Sidebar (desktop) */}
          <Sidebar
            tab={tab}
            setTab={setTab}
            query={query}
            setQuery={setQuery}
          >
            <SongList
              songs={filtered}
              currentId={current?.id}
              onPick={(id) => {
                pickById(id);
              }}
              loading={loading}
            />
          </Sidebar>

          {/* Player area */}
          <div className="rounded-2xl p-6 md:p-8 bg-black/25 shadow-card flex flex-col items-center">
            {current ? (
              <Player track={current} onPrev={prev} onNext={next} autoPlay />
            ) : (
              <div className="w-full h-[520px] grid place-items-center opacity-70">
                Loading…
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sheet (song list + tabs + search) */}
      <MobileSheet
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        tab={tab}
        setTab={setTab}
        query={query}
        setQuery={setQuery}
      >
        <SongList
          songs={filtered}
          currentId={current?.id}
          onPick={(id) => {
            pickById(id);
            setMobileOpen(false);
          }}
          loading={loading}
        />
      </MobileSheet>

      {/* Mobile floating button (optional if you prefer) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-5 right-5 px-4 py-2 rounded-full bg-white text-black shadow-card active:scale-95 transition"
      >
        Songs
      </button>
    </div>
  );
}
