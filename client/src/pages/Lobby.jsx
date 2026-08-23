import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, joinGame } from "../services/gameApis";

export default function Lobby() {
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const create = async () => {
    if (!name.trim()) {
      setError("Entre ton prénom pour commencer");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await createGame(name);
      navigate(`/game/${data.gameId}`, { state: { playerId: data.playerId } });
    } catch (err) {
      console.error(err);
      setError("Impossible de créer la partie, réessaie");
    } finally {
      setLoading(false);
    }
  };

  const join = async () => {
    if (!name.trim() || !gameId.trim()) {
      setError("Entre ton prénom et le code de la partie");
      return;
    }
    setError("");
    setLoading(true);
    try {

      const data = await joinGame(gameId, name);
      navigate(`/game/${gameId}`, { state: { playerId: data.playerId } });
    } catch (err) {
      console.error(err);
      setError("Impossible de rejoindre la partie, vérifie le code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4DC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* petites cartes/symboles décoratifs qui trainent, façon table de jeu */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-[#5AC8FA] border-[3px] border-[#1B1B1F] -rotate-12" />
        <div className="absolute top-24 right-16 w-12 h-12 rounded-full bg-[#FF6B57] border-[3px] border-[#1B1B1F] rotate-[8deg]" />
        <div className="absolute bottom-16 left-20 w-20 h-20 rounded-full bg-[#FFC93C] border-[3px] border-[#1B1B1F] rotate-6" />
        <div className="absolute bottom-24 right-24 w-14 h-14 rounded-full bg-[#8CD867] border-[3px] border-[#1B1B1F] rotate-[-10deg]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Badge titre façon jeton de jeu */}
        <div className="flex justify-center -mb-8 relative z-10">
          <div className="w-24 h-24 rounded-full bg-[#FFC93C] border-4 border-[#1B1B1F] shadow-[4px_4px_0_#1B1B1F] flex items-center justify-center -rotate-6">
            <span className="text-4xl">🎯</span>
          </div>
        </div>

        {/* Carte principale façon carton de jeu */}
        <div className="rounded-[28px] bg-white border-4 border-[#1B1B1F] shadow-[8px_8px_0_#1B1B1F] pt-14 pb-8 px-7">
          <h1 className="text-4xl font-black text-center text-[#1B1B1F] tracking-tight">
            Symbly
          </h1>
          <p className="text-center text-[#6B6B76] mt-2 text-sm font-medium">
            Repère le symbole commun avant l'adversaire !
          </p>

          {error && (
            <p className="mt-5 text-center text-sm font-bold text-[#B3261E] bg-[#FDEDEC] border-2 border-[#F3B4AF] rounded-xl py-2 px-3">
              {error}
            </p>
          )}

          <div className="mt-7 space-y-4">
            <div>
              <label className="text-xs font-bold text-[#1B1B1F] ml-1">
                TON PRÉNOM
              </label>
              <input
                type="text"
                placeholder="Marie"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border-[3px] border-[#1B1B1F] bg-white px-4 py-3 text-[#1B1B1F] placeholder:text-[#B7B7BF] font-semibold outline-none focus:bg-[#FFF9EC] transition"
              />
            </div>

            <button
              type="button"
              onClick={create}
              disabled={loading}
              className="w-full rounded-2xl bg-[#FF6B57] border-[3px] border-[#1B1B1F] py-3 text-white text-base font-black shadow-[4px_4px_0_#1B1B1F] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#1B1B1F] active:translate-y-0.5 active:shadow-[1px_1px_0_#1B1B1F] disabled:opacity-50 disabled:pointer-events-none transition-all"
            >
              {loading ? "Chargement..." : "🚀 CRÉER UNE PARTIE"}
            </button>
          </div>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-[3px] border-dashed border-[#E4E1D8]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs font-black text-[#B7B7BF] uppercase tracking-wider">
                ou
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#1B1B1F] ml-1">
                CODE DE LA PARTIE
              </label>
              <input
                type="text"
                placeholder="AB12CD"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border-[3px] border-[#1B1B1F] bg-white px-4 py-3 text-[#1B1B1F] placeholder:text-[#B7B7BF] font-mono font-bold tracking-widest outline-none focus:bg-[#EAF7FF] transition"
              />
            </div>

            <button
              type="button"
              onClick={join}
              disabled={loading}
              className="w-full rounded-2xl bg-[#5AC8FA] border-[3px] border-[#1B1B1F] py-3 text-[#1B1B1F] text-base font-black shadow-[4px_4px_0_#1B1B1F] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#1B1B1F] active:translate-y-0.5 active:shadow-[1px_1px_0_#1B1B1F] disabled:opacity-50 disabled:pointer-events-none transition-all"
            >
              {loading ? "Chargement..." : "🎮 REJOINDRE UNE PARTIE"}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs font-bold text-[#9A9AA3]">
          UN JEU RAPIDE • À JOUER PARTOUT
        </p>
      </div>
    </div>
  );
}