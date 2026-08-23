import express from "express";
import { generateDeck } from "../game/cards/GenerateCards.js";
import { games } from "../game/game/GameManager.js";
import Game from "../game/game/Game.js"
import Player from "../game/player/Player.js";
import { shuffle } from "../game/utilities/Shuffles.js";


const router = express.Router();

router.post("/create", (req, res) => {
  const gameId = crypto.randomUUID();
  const playerId = crypto.randomUUID();

  const deck = shuffle(generateDeck(5));
  const game = new Game(deck, gameId);
  const name = req.body.name;
  // Add the first player
  const player = new Player(playerId,name);
  
  game.addPlayer(player);

  games.set(gameId, game);
  res.json({
    gameId,
    playerId,
  });
});



router.post("/:gameId/start",(req,res)=>{
  const gameId = req.params.gameId;
  const game = games.get(gameId);
  if(!game){
    return res.status(404).json({ message:"game not found !!" });
  }

  game.start();

  const io = req.app.get("io");
  io.to(gameId).emit("gameStarted", {
    centerCard: game.centerCard,
    playerCards: Object.fromEntries(game.playerCards),
  });

  return res.status(200).json({ message: "Game started" });
});


router.post("/:gameId/join", (req, res) => {
  const gameId = req.params.gameId;

  const game = games.get(gameId);

  if (!game) {
    return res.status(404).json({
      message: "Game not found"
    });
  }

  if (game.started) {
    return res.status(400).json({
      message: "Game already started"
    });
  }

  if (game.players.length >= 2) {
    return res.status(400).json({
      message: "Game is full"
    });
  }

  const { name } = req.body;

  const playerId = crypto.randomUUID();
  const player = new Player(playerId, name);

  game.addPlayer(player);

  res.json({
    gameId,
    playerId
  });
});

router.get("/:gameId/state", (req, res) => {
  if(!req.params.gameId){
    return res.status(500).json({
      message: 'any game id given !!',
    });
  }

  const game = games.get(req.params.gameId);

    if (!game) {
        return res.status(404).json({
            message: "Game not found"
        });
    }

    const playerId = req.query.playerId;

    const playerCard = game.playerCards.get(playerId);

    res.json({
        started:game.started,
        centerCard: game.centerCard,
        playerCard: playerCard,
        score: game.score[playerId]
    });
});



router.post("/:gameId/click", (req, res) => {
    const game = games.get(req.params.gameId);

    if (!game) {
        return res.status(404).json({ error: "Game not found" });
    }

    const { playerId, symbolId } = req.body;

    const success = game.checkSamecard(playerId, symbolId);

    if (success) {
      game.nextRound(playerId);
    }

    const responseData = {
        success,
        finished: game.centerCard == null,
        centerCard: game.centerCard,
        playerCard: game.playerCards.get(playerId),
        score:game.score
    };

    // notifie TOUS les joueurs de la partie (via socket) que l'état a changé
    const io = req.app.get("io");
    io.to(req.params.gameId).emit("stateUpdate", {
      finished: responseData.finished,
      centerCard: game.centerCard,
      playerCards: Object.fromEntries(game.playerCards),
      score : game.score
    });

    res.json(responseData);
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