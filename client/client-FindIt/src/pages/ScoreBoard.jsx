import React from "react"
import { useNavigate } from "react-router";
import Background from "../components/Background";
import scoreboardBackground from "../assets/3771357.jpg";
import { p2Api } from "../helpers/http-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export default function Scoreboard() {
  const [scoreBoard, setScoreBoard] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const gameId = localStorage.getItem("gameId");
    socket.emit("joinGameRoom", gameId);

    const fetchScoreBoard = async () => {
      try {
        const response = await p2Api.get("/getscoreboard", {
          params: { gameId },
        });
        const sortedPlayers = [...response.data.players].sort(
          (a, b) => b.score - a.score
        );
        setScoreBoard(sortedPlayers);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching scoreboard", {
          autoClose: 300,
        });
      }
    };

    fetchScoreBoard();

    socket.on("scoreboardUpdate", (data) => {
      const sortedPlayers = [...data.players].sort((a, b) => b.score - a.score);
      setScoreBoard(sortedPlayers);
    });

    return () => {
      socket.off("scoreboardUpdate");
    };
  }, []);

  return (
    <Background>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen w-[850px] relative overflow-hidden bg-[#0a0a1f]"
      >
        {/* Animated background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10" />

        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="relative z-10 max-w-7xl mx-auto px-4 py-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
              MATCH RESULTS
            </h1>
            <div className="flex items-center justify-center gap-2">
              <span className="h-1 w-12 bg-blue-500 rounded-full" />
              <p className="text-blue-300 font-medium text-lg tracking-wide">COMPETITIVE STANDINGS</p>
              <span className="h-1 w-12 bg-blue-500 rounded-full" />
            </div>
          </div>

          <div className="grid gap-6 mb-8">
            <AnimatePresence>
              {scoreBoard.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className={`
            relative overflow-hidden rounded-2xl border
            ${index === 0 ? 'bg-gradient-to-r from-yellow-900/50 to-yellow-700/50 border-yellow-500' :
                      index === 1 ? 'bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-400' :
                        index === 2 ? 'bg-gradient-to-r from-orange-900/50 to-orange-800/50 border-orange-600' :
                          'bg-slate-900/50 border-blue-900/50'}
            `}>
                    <div className="absolute inset-0 backdrop-blur-sm" />
                    <div className="relative p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          {/* Rank Badge */}
                          <div className={`
                    w-16 h-16 rounded-lg flex flex-col items-center justify-center
                    ${index === 0 ? 'bg-yellow-500' :
                              index === 1 ? 'bg-slate-400' :
                                index === 2 ? 'bg-orange-600' :
                                  'bg-blue-900'}
                    `}>
                            <span className="text-2xl">
                              {index === 0 ? '👑' :
                                index === 1 ? '🥈' :
                                  index === 2 ? '🥉' :
                                    `#${index + 1}`}
                            </span>
                            <span className="text-xs font-bold text-white">RANK</span>
                          </div>

                          <div>
                            <h3 className="text-2xl font-extrabold text-white mb-1">{player.username}</h3>
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-1 rounded bg-blue-900/50 text-blue-300 text-sm">ID: {player.id}</span>
                              <span className="px-2 py-1 rounded bg-purple-900/50 text-purple-300 text-sm">
                                {index === 0 ? 'CHAMPION' :
                                  index === 1 ? 'RUNNER UP' :
                                    index === 2 ? 'FINALIST' : 'COMPETITOR'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            {player.score - 1}
                          </div>
                          <div className="text-blue-300 text-sm font-medium">POINTS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => navigate("/")}
              className="group relative px-12 py-4 overflow-hidden rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-2">
                <span className="text-lg font-bold text-white">Return to Lobby</span>
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </button>
          </motion.div>
        </motion.div>
        </motion.div>
    </Background>
  )
}
