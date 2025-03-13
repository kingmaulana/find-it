const router = require("express").Router();
const { Controller } = require("../controllers/controller");

router.post("/creategame", Controller.createGame);
router.post("/joingame", Controller.joinGame);

router.get("/waitplayer", Controller.waitPlayer);

router.get("/startgame", Controller.startGame);
router.post("/action", Controller.action);
router.get("/getplayercards", Controller.getPlayerCards);
router.get("/getdeckcards", Controller.getDeckCards);
router.get("/getscoreboard", Controller.getScoreboard);
router.get("/getgamestate", Controller.getGameState);


module.exports = router;
