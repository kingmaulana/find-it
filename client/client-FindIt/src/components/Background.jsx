import defaultBackground from '../assets/background-game.jpeg'


export default function Background({ backgroundImage, children }) {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-fit bg-center relative"
            style={{
                backgroundImage: `url(${backgroundImage || defaultBackground})`,
                backgroundColor: '#1a1a2e',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/70 to-gray-900/70 backdrop-blur-sm"></div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}