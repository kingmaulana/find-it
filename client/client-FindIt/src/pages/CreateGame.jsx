import { useNavigate } from "react-router";
import Background from "../components/Background";
import { p2Api } from "../helpers/http-client";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export default function CreateGame() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await p2Api.post("/creategame", { username });
      localStorage.setItem("gameId", response.data.game.id);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("username", response.data.user.username);

      socket.emit("joinWaitingRoom", response.data.game.id);

      toast.success("Game created successfully", {
        autoClose: 300,
      });
      navigate("/waiting");
    } catch (error) {
      console.log(error);
      toast.error("Error creating game", {
        autoClose: 300,
      });
    }
  };

  return (
    <Background>
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-fuchsia-600/90 p-8 rounded-2xl shadow-2xl backdrop-blur-md w-full sm:w-96 mx-4 border border-white/10"
    >
        <motion.h1 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="text-4xl font-bold text-white text-center mb-6"
        >
        🎮 Create Game
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6 mb-6">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <label
            htmlFor="username"
            className="block text-white text-lg font-semibold mb-2"
            >
            Username
            </label>
            <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </motion.div>

        <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl w-full shadow-lg transform transition-all duration-300 border border-white/20 backdrop-blur-sm"
            >
            Create Room 🎲
            </motion.button>
        </motion.div>
        </form>

        <motion.div 
            className="flex justify-center pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-6 rounded-xl border border-white/20 backdrop-blur-sm text-sm"
            >
            ← Back
            </motion.button>
        </motion.div>
        </motion.div>
    </Background>
  );
}
