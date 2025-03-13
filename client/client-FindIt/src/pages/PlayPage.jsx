import Background from "../components/Background";
import playPageBg from "../assets/1204.jpg";
import { useNavigate } from "react-router";

import { p2Api } from "../helpers/http-client";
import { useCallback, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export default function PlayPage() {
  const [playerImages, setPlayerImages] = useState([]);
  const [deckImages, setDeckImages] = useState([]);
  const [scoreBoard, setScoreBoard] = useState([]);
  const [deckLeft, setDeckLeft] = useState('')

  const navigate = useNavigate();

  const imageSpotIt = [
    { name: "anchor", img: "/anchor.png" },
    { name: "apple", img: "/apple.png" },
    { name: "art", img: "/art.png" },
    { name: "ball", img: "/ball.png" },
    { name: "baloon", img: "/baloon.png" },
    { name: "bomb", img: "/bomb.png" },
    { name: "bottle", img: "/bottle.png" },
    { name: "bulb", img: "/bulb.png" },
    { name: "cactus", img: "/cactus.png" },
    { name: "candle", img: "/candle.png" },
    { name: "car", img: "/car.png" },
    { name: "carrot", img: "/carrot.png" },
    { name: "cat", img: "/cat.png" },
    { name: "cheese", img: "/cheese.png" },
    { name: "clock", img: "/clock.png" },
    { name: "clown", img: "/clown.png" },
    { name: "dinasaur", img: "/dinasaur.png" },
    { name: "dog", img: "/dog.png" },
    { name: "doll", img: "/doll.png" },
    { name: "dolphin", img: "/dolphin.png" },
    { name: "dragon", img: "/dragon.png" },
    { name: "exclam", img: "/exclam.png" },
    { name: "eye", img: "/eye.png" },
    { name: "fire", img: "/fire.png" },
    { name: "flower", img: "/flower.png" },
    { name: "fourLeaf", img: "/fourLeaf.png" },
    { name: "ghost", img: "/ghost.png" },
    { name: "glasses", img: "/glasses.png" },
    { name: "heart", img: "/heart.png" },
    { name: "horse", img: "/horse.png" },
    { name: "ice", img: "/ice.png" },
    { name: "igloo", img: "/igloo.png" },
    { name: "key", img: "/key.png" },
    { name: "ladybug", img: "/ladybug.png" },
    { name: "lightning", img: "/lightning.png" },
    { name: "lips", img: "/lips.png" },
    { name: "lock", img: "/lock.png" },
    { name: "mapple", img: "/mapple.png" },
    { name: "moon", img: "/moon.png" },
    { name: "musicNode", img: "/musicNode.png" },
    { name: "ok", img: "/ok.png" },
    { name: "oneEye", img: "/oneEye.png" },
    { name: "painting", img: "/painting.png" },
    { name: "pencil", img: "/pencil.png" },
    { name: "question", img: "/question.png" },
    { name: "scissor", img: "/scissor.png" },
    { name: "skull", img: "/skull.png" },
    { name: "snowflake", img: "/snowflake.png" },
    { name: "snowman", img: "/snowman.png" },
    { name: "spider", img: "/spider.png" },
    { name: "stop", img: "/stop.png" },
    { name: "sun", img: "/sun.png" },
    { name: "target", img: "/target.png" },
    { name: "tree", img: "/tree.png" },
    { name: "water", img: "/water.png" },
    { name: "web", img: "/web.png" },
    { name: "zebra", img: "/zebra.png" },
  ];

  
  useEffect(() => {
    socket.emit("joinGameRoom", localStorage.getItem("gameId"));

    const fetchInitialState = async () => {
      try {
        const response = await p2Api.get("/getgamestate", {
          params: {
            gameId: localStorage.getItem("gameId"),
            userId: localStorage.getItem("userId"),
          },
        });
        const gameState = response.data;
        const currentPlayer = gameState.players.find(
          (p) => p.id === Number(localStorage.getItem("userId"))
        );
        setPlayerImages(currentPlayer.playerCards[0]);
        setDeckImages(gameState.game.deckCards[0]);
        setScoreBoard(gameState.players);
        setDeckLeft(gameState.game.totalDecks)
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialState();

    socket.on("actionError", (error) => {
      if (error.message === "Image not matched") {
        toast.error("Image not matched", { autoClose: 300 });
      }
    });

    socket.on("gameStateUpdate", (gameState) => {
      console.log("🚀 ~ socket.on ~ gameState:", gameState)
      const currentPlayer = gameState.players.find(
        (p) => p.id === Number(localStorage.getItem("userId"))
      );
      setPlayerImages(currentPlayer.playerCards[0]);
      setDeckImages(gameState.game.deckCards[0]);
      setScoreBoard(gameState.players);
      setDeckLeft(gameState.game.totalDecks)
    });

    socket.on("gameEnded", (finalState) => {
      navigate("/scoreboard");
    });

    return () => {
      socket.off("gameStateUpdate");
      socket.off("actionError");
      socket.off("gameEnded");
    };
  }, [navigate]);

  const handleAction = useCallback(async (imageId, e) => {
    e.preventDefault();
    try {
      await socket.emit("playerAction", {
        userId: localStorage.getItem("userId"),
        gameId: localStorage.getItem("gameId"),
        imageId: imageId,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Background backgroundImage={playPageBg}>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-pink-900/90 relative overflow-hidden">
      <div>
        <h1 className="text-4xl font-bold text-white">Remaining Deck {deckLeft} / 10</h1>
      </div>
        {/* VS Banner */}
        {/* <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30">
          <div className="relative">
            <div className="text-7xl font-extrabold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text animate-pulse">VS</div>
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 via-purple-500/30 to-blue-500/30 blur-xl"></div>
          </div>
        </div> */}
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[600px] bg-blue-500/30 rounded-full filter blur-[100px] animate-pulse -top-40 -left-40 mix-blend-overlay"></div>
          <div className="absolute w-[600px] h-[600px] bg-purple-500/30 rounded-full filter blur-[100px] animate-pulse top-1/2 -right-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[url('/particles.png')] opacity-30 animate-floating mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        {/* Main Game Area */}
        <div className="container mx-auto flex flex-wrap justify-between items-start relative z-10 px-8 gap-10 mt-20">
          {/* Game Status Banner */}
          {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="relative">
              <div className="bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 px-8 py-3 rounded-full shadow-lg backdrop-blur-xl border border-white/20">
                <div className="text-white font-bold text-xl tracking-wider animate-pulse flex items-center gap-4">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
                  MATCH IN PROGRESS
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
                </div>
              </div>
            </div>
          </div> */}
          {/* Left Deck (Point Deck) */}
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] p-8 w-[450px] transform transition-all duration-500 border border-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)]">
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center py-4 rounded-xl mb-8 font-bold text-2xl shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/30 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0 group-hover:translate-x-full duration-1000 transition-transform"></div>
              <span className="relative font-game tracking-widest uppercase">Game Deck</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {deckImages.map((imageId) => (
                <div
                  key={imageId}
                  className="bg-white/90 backdrop-blur-md p-5 rounded-xl text-center shadow-[0_0_15px_rgba(0,0,0,0.2)] transform transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:bg-white group">
                  <img
                    src={imageSpotIt[imageId].img}
                    alt={imageSpotIt[imageId].name}
                    className="w-full h-auto transform transition-all duration-300 group-hover:rotate-6 filter drop-shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Deck (Player Deck) */}
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] p-8 w-[450px] transform transition-all duration-500 border border-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(236,72,153,0.4)]">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center py-4 rounded-xl mb-8 font-bold text-2xl shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-pink-500/30 animate-pulse"></div>
              <span className="relative">{localStorage.getItem("username")}</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {playerImages.map((imageId) => (
                <button
                key={imageId}
                  className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] transform transition-all duration-300 hover:shadow-[0_0_35px_rgba(79,70,229,0.6)] hover:bg-white/95 group relative hover:border-indigo-500/50 border-2 border-transparent"
                  onClick={(e) => {
                    handleAction(imageId, e);
                  }}>
                  <img
                    src={imageSpotIt[imageId].img}
                    alt={imageSpotIt[imageId].name}
                    className="w-full h-auto transform transition-all duration-300 group-hover:rotate-6 filter drop-shadow-lg"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Scoreboard */}
          <div className="backdrop-blur-xl bg-black/30 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] p-6 w-[450px] transform transition-all duration-500 border border-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center py-4 rounded-xl mb-6 font-bold text-2xl shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/30 animate-pulse"></div>
              <div className="relative flex items-center justify-center gap-4">
                <div className="w-8 h-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 3C19.5376 3 22 5.46243 22 8.5C22 9.83879 21.5217 11.0659 20.7266 12.0196L12 21.7071L3.27337 12.0196C2.47825 11.0659 2 9.83879 2 8.5C2 5.46243 4.46243 3 7.5 3C9.35167 3 10.9902 3.92345 12 5.3246C13.0098 3.92345 14.6483 3 16.5 3ZM12 18.5858L18.6159 11.2506C19.1591 10.6399 19.5 9.85457 19.5 9C19.5 7.067 17.933 5.5 16 5.5C14.067 5.5 12.5 7.067 12.5 9H11.5C11.5 7.067 9.933 5.5 8 5.5C6.067 5.5 4.5 7.067 4.5 9C4.5 9.85457 4.84091 10.6399 5.38411 11.2506L12 18.5858Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="font-game tracking-widest uppercase">Live Scoreboard</span>
                <div className="w-8 h-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 3C19.5376 3 22 5.46243 22 8.5C22 9.83879 21.5217 11.0659 20.7266 12.0196L12 21.7071L3.27337 12.0196C2.47825 11.0659 2 9.83879 2 8.5C2 5.46243 4.46243 3 7.5 3C9.35167 3 10.9902 3.92345 12 5.3246C13.0098 3.92345 14.6483 3 16.5 3ZM12 18.5858L18.6159 11.2506C19.1591 10.6399 19.5 9.85457 19.5 9C19.5 7.067 17.933 5.5 16 5.5C14.067 5.5 12.5 7.067 12.5 9H11.5C11.5 7.067 9.933 5.5 8 5.5C6.067 5.5 4.5 7.067 4.5 9C4.5 9.85457 4.84091 10.6399 5.38411 11.2506L12 18.5858Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
              <div className="space-y-2.5">
                {scoreBoard.map((player, index) => (
                  <div
                    key={player.id}
                    className={`relative overflow-hidden rounded-xl backdrop-blur-md transition-all duration-300 border ${player.id === Number(localStorage.getItem("userId"))
                      ? 'border-yellow-400/50 bg-gradient-to-r from-yellow-400/10 to-amber-400/10'
                      : 'border-white/10 hover:bg-white/5'
                      }`}
                  >
                    <div className="flex items-center justify-between p-4 relative">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                          {player.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="text-white font-bold">{player.username}</div>
                          {/* <div className="text-white/60 text-sm">Rank #{index + 1}</div> */}
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                          <div className="text-sm text-white/60">SCORE</div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
                            {player.score - 1}
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${player.id === Number(localStorage.getItem("userId"))
                          ? 'bg-green-500 animate-pulse'
                          : 'bg-white/30'
                          }`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* End Game Button */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => navigate("/scoreboard")}
                  className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  <span className="relative">
                    End Game
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}
