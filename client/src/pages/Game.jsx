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
  const { gameId } = useParams();
  const { state } = useLocation();
  const playerId = state?.playerId;




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
      ):(
        <div>
          <h1>
            GameId : {gameId}
          </h1>
          <button onClick={start}>
            commencer la partie 
          </button>
        </div>
      )}
    </div>

    
  );
}