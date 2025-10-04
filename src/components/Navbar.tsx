'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link'

const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/leaderboard', label: 'Leaderboard' },
        { href: '/passport', label: 'Passport' },
        { href: 'https://ieeeday.ieeensbm.org/#register', label: 'Register' },
    ]

    return (
        <div>
            <div className="max-w-screen hidden sm:hidden fixed bg-white/5 backdrop-blur-lg top-2 right-1/2 translate-x-1/2 z-100 md:flex gap-6 2xl:gap-8 text-white transition-all duration-300 px-10 py-6">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`${pathname === item.href && "font-bold"} ${item.label === 'Register' && "bg-white text-black px-3 py-2"} text-2xl m-auto hover:scale-110 transition-all duration-300`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
            <div
                className={`block sm:block md:hidden fixed z-100 h-10 bg-white/5 backdrop-blur-lg transition-all duration-500 text-white ${isExpanded ? "h-screen w-screen" : "w-10 top-2 left-2"}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <svg className={`${isExpanded ? "hidden" : "block"} p-1 m-auto`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
                <div className={`${isExpanded ? "block" : "hidden"} absolute flex flex-col gap-4 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`} >
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`${pathname === item.href && "font-bold"} ${item.label === 'Register' && "bg-white text-black px-3 py-2"} text-xl m-auto hover:scale-110 transition-all duration-300`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Navbar
