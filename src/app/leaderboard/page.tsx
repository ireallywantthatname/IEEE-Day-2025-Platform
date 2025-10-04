import Countdown from "@/components/Countdown"

const Home = () => {
    return (
        <div className="relative z-50 flex items-center justify-center h-screen">
            <div className="bg-white/5 backdrop-blur-lg px-12 md:px-24 py-6 md:py-12 text-xl md:text-3xl">
            <div className="text-base md:text-xl mb-2 md:mb-4">Leaderboard will be unlock in</div>
                <Countdown date="2025-10-07T12:00:00Z" />
            </div>
        </div>
    )
}

export default Home