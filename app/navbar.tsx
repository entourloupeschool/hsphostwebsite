import React from "react";
import Link from "next/link";


const CustomNavbar: React.FC = () => {
    const pages = [
        {
            name: "Home",
            link: "/",
            description: 'home page'
        },
        {
            name: "Game",
            link: "/game",
            description: 'game page'
        }
    ]

    return (
        <header className="flex flex-col items-center justify-between">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <nav className="fixed left-0 top-0 flex w-full justify-evenly border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30" aria-label="navbar">
                    {pages.map((page, index) => (
                        <Link key={index} href={page.link} className="underline decoration-transparent transition duration-300 ease-in-out hover:decoration-inherit font-mono font-bold">
                            {page.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default CustomNavbar;