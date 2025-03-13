import Background from "../components/Background";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function HowToPlay() {
const navigate = useNavigate();

const handleBack = () => {
    navigate("/");
};

const listItems = [
    {
    title: "Start a Game",
    icon: "🎮",
    content: "Create a game and share the Game ID with your friends, or join an existing game using the Game ID."
    },
    {
    title: "Objective",
    icon: "🎯",
    content: "The goal is to spot the matching symbols on two cards as quickly as possible."
    },
    {
    title: "Gameplay",
    icon: "🎲",
    content: "Each round, two cards are displayed. Every card has exactly one symbol in common with another card."
    },
    {
    title: "Win",
    icon: "🏆",
    content: "The player who identifies the match first scores a point. Keep playing until a winner is declared!"
    }
];

return (
    <Background>
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-fuchsia-600/90 p-8 rounded-2xl shadow-2xl backdrop-blur-md w-full max-w-2xl mx-4 border border-white/10"
    >
        <motion.h1 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="text-4xl font-bold text-white text-center mb-8"
        >
        🎪 How to Play
        </motion.h1>

        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6 text-white/90"
        >
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg leading-relaxed text-center mb-8 font-medium"
        >
            Spot-It is a fun and fast-paced game where players compete to find
            matching symbols between cards. Here's how you can play:
        </motion.p>

        <div className="space-y-6">
            {listItems.map((item, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm"
            >
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                {item.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                {item.content}
                </p>
            </motion.div>
            ))}
        </div>

        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-lg font-medium pt-4"
        >
            ✨ Get ready for an exciting and competitive experience with Spot-It! ✨
        </motion.p>
        </motion.div>

        <motion.div 
        className="flex justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        >
        <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-6 rounded-xl border border-white/20 backdrop-blur-sm text-sm"
        >
            ← Back to Home
        </motion.button>
        </motion.div>
    </motion.div>
    </Background>
);
}
