import { NavLink } from "react-router";
import { motion } from "framer-motion";
import Background from "../components/Background";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

// Floating Icon Component
const FloatingIcon = ({ icon, initialX, initialY }) => {
const randomDuration = 15 + Math.random() * 10;
const randomDelay = Math.random() * 2;

return (
    <motion.div
    initial={{ opacity: 0, x: initialX, y: initialY }}
    animate={{
        opacity: [0, 1, 1, 0],
        x: [initialX, initialX + Math.random() * 100 - 50],
        y: [initialY, initialY - 200],
    }}
    transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "linear",
    }}
    className="absolute text-4xl text-white/20 pointer-events-none select-none"
    >
    {icon}
    </motion.div>
);
};

const floatingIcons = [
"🎮", "🎲", "🎯", "🎪", "🎨", "🎭", "⭐", "✨", 
"💫", "🌟", "⚡", "🎵", "🎶", "🎪", "🎫"
];

export default function LandingPage() {
const generateIconPositions = () => {
    return floatingIcons.map((icon) => ({
    icon,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight + window.innerHeight/2,
    }));
};

const iconPositions = generateIconPositions();
return (
    <Background>
    {/* Floating Icons Container */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {iconPositions.map((item, index) => (
        <FloatingIcon
            key={index}
            icon={item.icon}
            initialX={item.x}
            initialY={item.y}
        />
        ))}
    </div>
    <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-fuchsia-600/90 p-10 rounded-2xl shadow-2xl backdrop-blur-md max-w-md w-full border border-white/10"
    >
        <motion.div
        whileHover={{ scale: 1.05 }}
        className="text-center mb-8"
        >
        <h1 className="text-5xl font-extrabold text-white mb-2 tracking-wider">
            🎯 Spot It! 🎯
        </h1>
        <p className="text-white text-opacity-90 text-md font-light mt-5">Ready to play?</p>
        </motion.div>
        
        <div className="flex flex-col items-center space-y-6">
        <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <NavLink
            to="/createGame"
            className="block bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 text-center backdrop-blur-sm hover:shadow-xl border border-white/20"
            >
            🎮 Create Game
            </NavLink>
        </motion.div>
        
        <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <NavLink
            to="/joinGame"
            className="block bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 text-center backdrop-blur-sm hover:shadow-xl border border-white/20"
            >
            🎲 Join Game
            </NavLink>
        </motion.div>
        
        <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <NavLink
            to="/howtoplay"
            className="block bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 text-center backdrop-blur-sm hover:shadow-xl border border-white/20"
            >
            📖 How to Play
            </NavLink>
        </motion.div>
        </div>
        
        <div className="mt-8 text-center text-white text-opacity-80 text-sm">
        <p>✨ Find matching symbols to win! ✨</p>
        </div>
    </motion.div>
    </Background>
);
}
