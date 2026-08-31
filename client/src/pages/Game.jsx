import { useLocation, useParams } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { clickCard, createGame, getState, startGame } from "../services/gameApis";
import socket from "../services/socket";


export default function Game() {
  const [centerCard, setCenterCard] = useState([]);
  const [playerCard, setPlayerCard] = useState([]);
  const [gameStarted,setGameStarted] = useState(false);
  const [score,setScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const { gameId } = useParams();
  const { state } = useLocation();
  const playerId = state?.playerId;



  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de la copie :", error);
    }
  };

  async function handleSymbolClick(symbolId) {
    const data = await clickCard(gameId, playerId, symbolId);
    if(data.finished){
      alert("partie terminée");
      return;
    }
    else if (data.success) {
      setCenterCard(data.centerCard);
      setPlayerCard(data.playerCard);
    }
    
  }

  async function loadGame() {
    if (!gameId || !playerId) return;

    const data = await getState(gameId, playerId);

    setGameStarted(data.started);

    if (!data.started) {
      return;
    }
    
    setCenterCard(data.centerCard);
    setPlayerCard(data.playerCard);
  }

  async function start() {
    await startGame(gameId);
    setGameStarted(true);
  }

  useEffect(() => {
    if (!gameId || !playerId) return;

    socket.emit("joinGame", { gameId, playerId });

    socket.on("gameStarted", (data) => {
      setGameStarted(true);
      setCenterCard(data.centerCard);
      setPlayerCard(data.playerCards[playerId]);
    });

    socket.on("stateUpdate", (data) => {
      if (data.finished) {
        alert("partie terminée");
        return;
      }
      setCenterCard(data.centerCard);
      setPlayerCard(data.playerCards[playerId]);
      setScore(data.score);

    });

    return () => {
      socket.off("gameStarted");
      socket.off("stateUpdate");
    };
}, [gameId, playerId]);

  return (
    <div className="min-h-screen bg-[#FFF4DC] p-6">

      {gameStarted ? (
        <div className="max-w-5xl mx-auto">
          {/* Bandeau code de partie */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white border-[3px] border-[#1B1B1F] rounded-full px-5 py-2 shadow-[4px_4px_0_#1B1B1F]">
              <span className="text-xs font-bold text-[#6B6B76] uppercase tracking-wider">
                Partie
              </span>
              <span className="font-mono font-black text-[#1B1B1F] tracking-widest">
                {gameId}
              </span>
            </div>
          </div>
          <div>
            Score : {score[playerId] || 0}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
            {/* Carte du joueur (à gauche) */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-black text-[#6B6B76] uppercase tracking-wider">
                Ta carte
              </span>
              <div className="rounded-full border-[4px] border-[#1B1B1F] shadow-[6px_6px_0_#1B1B1F]">
                <Card symbols={playerCard} onSymbolClick={handleSymbolClick} />
              </div>
            </div>

            {/* Carte centrale (à droite) */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-black text-[#6B6B76] uppercase tracking-wider">
                Carte de la table
              </span>
              <div className="rounded-full border-[4px] border-[#1B1B1F] shadow-[6px_6px_0_#1B1B1F]">
                <Card symbols={centerCard} onSymbolClick={() => {}} />
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-xs font-bold text-[#9A9AA3]">
            CLIQUE SUR LE SYMBOLE COMMUN AUX DEUX CARTES
          </p>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* cercles décoratifs façon table de jeu */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-[#5AC8FA] border-[3px] border-[#1B1B1F] -rotate-12" />
            <div className="absolute top-24 right-16 w-12 h-12 rounded-full bg-[#FF6B57] border-[3px] border-[#1B1B1F] rotate-[8deg]" />
            <div className="absolute bottom-16 left-20 w-20 h-20 rounded-full bg-[#FFC93C] border-[3px] border-[#1B1B1F] rotate-6" />
            <div className="absolute bottom-24 right-24 w-14 h-14 rounded-full bg-[#8CD867] border-[3px] border-[#1B1B1F] rotate-[-10deg]" />
          </div>

          <div className="relative w-full max-w-sm">
            {/* Badge façon jeton */}
            <div className="flex justify-center -mb-8 relative z-10">
              <div className="w-24 h-24 rounded-full bg-[#8CD867] border-4 border-[#1B1B1F] shadow-[4px_4px_0_#1B1B1F] flex items-center justify-center rotate-6">
                <span className="text-4xl">⏳</span>
              </div>
            </div>

            <div className="rounded-[28px] bg-white border-4 border-[#1B1B1F] shadow-[8px_8px_0_#1B1B1F] pt-14 pb-8 px-7 text-center">
              <span className="text-xs font-bold text-[#6B6B76] uppercase tracking-wider">
                Partie
              </span>
              <div className="relative mt-1 inline-block">
                <button
                  type="button"
                  onClick={() => copyText(gameId)}
                  className="flex items-center gap-3 bg-[#FFF9EC] border-[3px] border-[#1B1B1F] rounded-full pl-5 pr-2 py-2 cursor-pointer hover:bg-[#FFF3D9] active:translate-y-0.5 transition-all"
                >
                  <span className="font-mono font-black text-[#1B1B1F] tracking-widest text-lg">
                    {gameId}
                  </span>

                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1B1B1F] shrink-0">
                    {copied ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8CD867" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFF9EC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <rect x="9" y="9" width="12" height="12" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </span>
                </button>

                {/* Tooltip "Copié !" */}
                <span
                  className={`absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1B1B1F] text-white text-xs font-black px-3 py-1.5 rounded-full transition-all duration-200 ${
                    copied ? "opacity-100 -translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
                  }`}
                >
                  Copié !
                </span>
              </div>

              <p className="mt-5 text-[#6B6B76] text-sm font-medium">
                Partage ce code à tes amis, puis lance la partie quand tout le monde est prêt !
              </p>

              <button
                type="button"
                onClick={start}
                className="mt-7 w-full rounded-2xl bg-[#FF6B57] border-[3px] border-[#1B1B1F] py-3 text-white text-base font-black shadow-[4px_4px_0_#1B1B1F] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#1B1B1F] active:translate-y-0.5 active:shadow-[1px_1px_0_#1B1B1F] transition-all"
              >
                🚀 COMMENCER LA PARTIE
              </button>
            </div>

            <p className="mt-6 text-center text-xs font-bold text-[#9A9AA3]">
              EN ATTENTE DES JOUEURS
            </p>
          </div>
        </div>
      )}
    </div>

    
  );
}