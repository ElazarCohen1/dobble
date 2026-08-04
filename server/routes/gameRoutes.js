import express from "express";
import { generateDeck } from "../game/cards/GenerateCards.js";
import { games } from "../game/game/GameManager.js";
import Game from "../game/game/Game.js"
import Player from "../game/player/Player.js";


const router = express.Router();

router.post("/create", (req, res) => {
  const gameId = crypto.randomUUID();
  const playerId = crypto.randomUUID();

  const deck = generateDeck(2);
  const game = new Game(deck, gameId);
  const name = req.body.name;
  // Add the first player
  const player = new Player(playerId,name);
  
  game.addPlayer(player);
  game.start();

  games.set(gameId, game);

  res.json({
    gameId,
    playerId,
  });
});


router.post("/:gameId/join", (req, res) => {
  const game = games.get(req.params.gameId);

  if (!game) {
    return res.status(404).json({
      message: "Game not found",
    });
  }

  if (game.players.size >= 2) {
    return res.status(400).json({
      message: "Game is full",
    });
  }

  const { name } = req.body;

  const playerId = crypto.randomUUID();

  game.players.set(playerId, {
    name,
    score: 0,
  });

  res.json({
    gameId: req.params.gameId,
    playerId,
  });
});

router.get("/:gameId/state", (req, res) => {

    const game = games.get(req.params.gameId);

    if (!game) {
        return res.status(404).json({
            message: "Game not found"
        });
    }

    const playerId = req.query.playerId;

    const playerCard = game.playerCards.get(playerId);

    res.json({
        centerCard: game.centerCard,
        playerCard: playerCard,
        score: game.score[playerId]
    });
});


router.get("/deleteGame",(req,res)=>{
  const gameId = req.params.gameId;
  const game = games.get(gameId);

  if (!game) {
        return res.status(404).json({
            message: "Game not found"
        });
  }

  game.delete();

  games.delete(gameId);

  res.status(200);
})


export default router;