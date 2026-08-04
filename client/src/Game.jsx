import { useLocation, useParams } from "react-router-dom";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { createGame, getState } from "./services/gameApis";


export default function Game() {
  const [centerCard,setCenterCard] = useState([]);
  const [playerCard, setPlayerCard] = useState([]);


  const {gameId} = useParams();
  const {state} = useLocation();
  const playerId = state?.playerId;

  async function loadGame(params) {

      if (!gameId || !playerId) return;
      const data = await getState(gameId,playerId);
      setCenterCard(data.centerCard);
      setPlayerCard(data.playerCard);

  }

  useEffect(()=>{
    loadGame();

  },[gameId,playerId]);

  console.log(centerCard);
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-fuchsia-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-row-2 gap-10 items-center">

          <div className="flex justify-center">
            <Card symbols = {centerCard}/>
          </div>

          <div className="flex justify-center">
            <Card symbols = {playerCard} />
          </div>

        </div>


      </div>
    </div>
  );
}


