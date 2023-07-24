'use client';

import React from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Iframe from 'react-iframe';

const horizontalSizeClasses = "flex flex-col sm:flex-row justify-between items-center gap-x-2 mx-4 sm:mx-2";
const horizontalEventSizeClasses = "flex flex-col justify-between items-center gap-2  mx-4 sm:mx-2";
const inputClasses = "w-48 pl-2 border-2 border-blue-500 focus:border-blue-700 focus:outline-none text-blue-500 hover:border-blue-700 font-bold py-2 rounded";

export default function EllipticalOrbitArt() {
    return (
        <main className="flex flex-col min-h-screen items-center p-4 sm:p-18 gap-y-8">
            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 gap-x-16 lg:text-left">
                <div className="group rounded-lg border border-transparent px-5 py-4">
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        The Art of Elliptical Orbits
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Welcome to our interactive p5.js canvas! Here, we&#39;re simulating the mesmerizing dance of celestial bodies as they move in elliptical orbits. The main dot represents a celestial body, and its path forms an elliptical orbit. The smaller dots that occasionally appear represent other bodies influenced by the main body&#39;s gravitational pull.
                    </p>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        This simulation is powered by p5.js, a JavaScript library that makes coding visual and interactive sketches accessible to artists, designers, educators, and beginners. We invite you to tinker with the settings below to see how they affect the celestial dance. Change the size of the main dot, its speed, or the speed of the canvas rotation, and watch as the scene transforms before your eyes. Enjoy the exploration!
                    </p>
                </div>
                <Iframe url="https://editor.p5js.org/entourloupeschool/embed/JDlGAjRld"
                    width="100%"
                    height="100%"
                    id="canvas-container"
                    className="rounded-lg border border-transparent px-5 py-4"
                    display="initial"
                    position="relative"
                    allowFullScreen
                />
            </div>
        </main>
    )
};