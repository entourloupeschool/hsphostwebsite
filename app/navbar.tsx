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
        <header>
            <div>
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none" aria-label="Global">
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