import { useNavigate } from "react-router";
import waitingPageBackground from "../assets/3771357.jpg";
import Background from "../components/Background";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayers } from "../contexts/player.context";


const PulsatingDot = () => (
    <motion.div
    animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
    }}
    transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
    }}
    className="w-3 h-3 bg-green-500 rounded-full"
    />
);

export default function Waiting() {
    const socketRef = useRef(null);
    const navigate = useNavigate();
    const { players, updatePlayers } = usePlayers();
    const gameId = localStorage.getItem("gameId");

    useEffect(() => {
        // Only create a new socket if one doesn't exist
        if (!socketRef.current) {
            socketRef.current = io("http://localhost:3000");
        }

        // Join waiting room
        socketRef.current.emit("joinWaitingRoom", gameId);

        // Set up event listeners
        const handlePlayerListUpdate = (data) => {
            updatePlayers(data.players);
        };

        const handleGameStart = () => {
            navigate("/playPage");
        };  

        socketRef.current.on("playerListUpdate", handlePlayerListUpdate);
        socketRef.current.on("gameStart", handleGameStart);

        // Cleanup function
        return () => {
            if (socketRef.current) {
                socketRef.current.off("playerListUpdate", handlePlayerListUpdate);
                socketRef.current.off("gameStart", handleGameStart);
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [gameId, navigate, updatePlayers]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (socketRef.current) {
            socketRef.current.emit("startGame", gameId);
        }
    };
    
    return (
        <Background backgroundImage={waitingPageBackground}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-fuchsia-600/90 p-8 rounded-2xl shadow-2xl backdrop-blur-md w-full max-w-md mx-4 border border-white/10"
            >
                <motion.div className="text-center mb-8">
                    <motion.h1
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-4xl font-bold text-white mb-4"
                    >
                        🎮 Waiting Room
                    </motion.h1>

                    <motion.div
                        className="flex items-center justify-center gap-2 mb-6"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <PulsatingDot />
                        <span className="text-white/80">Waiting for players...</span>
                        <PulsatingDot />
                    </motion.div>

                    <motion.div
                        className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm mb-6"
                        whileHover={{ scale: 1.02 }}
                    >
                        <p className="text-white text-sm mb-2">Share this Game ID with your friends:</p>
                        <p className="text-xl font-mono bg-white/10 p-2 rounded-lg text-white/90 select-all">
                            {gameId}
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm overflow-hidden mb-6"
                >
                    <div className="bg-white/10 py-3 px-4">
                        <h2 className="text-white font-semibold">Players</h2>
                    </div>
                    <AnimatePresence>
                        {players.map((player, index) => (
                            <motion.div
                                key={player.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 py-3 px-4 border-t border-white/10"
                            >
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                                    {player.User.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-white/90">{player.User.username}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="flex justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl transform transition-all duration-200 shadow-lg hover:shadow-xl w-full"
                    >
                        Start Game 🚀
                    </button>
                </motion.div>
            </motion.div>
        </Background>
    );
}
