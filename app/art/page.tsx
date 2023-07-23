'use client';

import React from "react";
import { useState, useEffect, useRef } from "react";
import { ChangeEvent } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import p5Types, { Vector } from "p5"; //Import this for typechecking and intellisense

interface ComponentProps {
  // Your component props
}

import dynamic from 'next/dynamic'

const horizontalSizeClasses = "flex flex-col sm:flex-row justify-between items-center gap-x-2 mx-4 sm:mx-2";
const horizontalEventSizeClasses = "flex flex-col justify-between items-center gap-2  mx-4 sm:mx-2";
const inputClasses = "w-48 pl-2 border-2 border-blue-500 focus:border-blue-700 focus:outline-none text-blue-500 hover:border-blue-700 font-bold py-2 rounded";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

function getColor(p5: p5Types, x: number, y: number) {
    // Map the y position of the dot to a value between 0 and 1
    let verticalColorValue = p5.map(y, -p5.height / 2, p5.height / 2, 0, 1);
    // Map the x position of the dot to a value between 0 and 1
    let horizontalColorValue = p5.map(x, -p5.width / 2, p5.width / 2, 0, 1);

    // Use the colorValues to interpolate between the colors
    let verticalColor = p5.lerpColor(p5.color(0, 0, 255), p5.color(255, 255, 0), verticalColorValue);
    let horizontalColor = p5.lerpColor(p5.color(0, 255, 0), p5.color(255, 0, 0), horizontalColorValue);

    // Average the two colors
    return p5.lerpColor(verticalColor, horizontalColor, 0.6);
};

class Dot {
    p5: p5Types;
    position: Vector;
    velocity: Vector;
    born: number;
    size: number;
  
    constructor(p5: p5Types, x: number, y: number, vx: number, vy: number, born: number, size: number) {
      this.p5 = p5;
      this.position = p5.createVector(x, y);
      this.velocity = p5.createVector(vx, vy);
      this.born = born;
      this.size = size;
    };
  
    update() {
      this.position.add(this.velocity);
    };
  
    display() {
        let c = getColor(this.p5, this.position.x, this.position.y);

        this.p5.fill(c);
        this.p5.ellipse(this.position.x, this.position.y, this.size, this.size);        
    };
};

export default function Art() {
    const [size, setSize] = useState(50); // size of the dot
    const [dotSpeed, setDotSpeed] = useState(0.08); // speed of the dot
    const [canvasRotationSpeed, setCanvasRotationSpeed] = useState(0.006); // speed of rotation
    const [freqPop, setFreqPop] = useState(0.1); // frequency of pop
    const [childDotsLifeExpectency, setChildDotsLifeExpectency] = useState(240); // frequency of pop
    const [explode, setExplode] = useState(5); // frequency of pop

    const p5Ref = useRef<p5Types | null>(null);
    const canvasAngleRef = useRef<number>(0);
    const initPosRef = useRef<number>(0);
    const dotsRef = useRef<Dot[]>([]);

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        const ratioWidthHeight: number = 640 / 480;
        const width: number = window.innerWidth > 325 ? 640 : 280;
        const height: number = width / ratioWidthHeight;

        p5.createCanvas(width, height).parent(canvasParentRef);
        p5Ref.current = p5;
    };

    const draw = () => {
        if (p5Ref.current !== null) {
            const p5 = p5Ref.current;
    
            p5.background(0);
            p5.translate(p5.width / 2, p5.height / 2); // move origin to center
            p5.rotate(canvasAngleRef.current); // rotate the canvas

            let x = 100 * p5.cos(initPosRef.current); // calculate x and y based on angle
            let y = 200 * p5.sin(initPosRef.current); // multiply y by 2 for elliptical orbit

            let c = getColor(p5, x, y);

            p5.fill(c); // Set fill color for ellipse
            p5.ellipse(x, y, size, size); // draw ellipse at x, y

            // Create new dot and add to array
            if (p5.random() < freqPop) { // 1% chance to create a new dot
                let childSpeed = p5.random(0.5, explode);

                // random small velocity for child dot
                let vx = p5.random(-childSpeed, childSpeed);
                let vy = p5.random(-childSpeed, childSpeed);

                // Calculate velocity of main dot
                let vx_main = dotSpeed * p5.cos(initPosRef.current) + vx;
                let vy_main = dotSpeed * p5.sin(initPosRef.current) + vy;
                dotsRef.current.push(new Dot(p5, x, y, vx_main, vy_main, p5.frameCount, size));
            }
    
            // Update and display dots
            for (let i = dotsRef.current.length - 1; i >= 0; i--) {
                dotsRef.current[i].update();
                dotsRef.current[i].display();
        
                // Remove dot if it has existed for more than a random amount of frames
                if (p5.frameCount - dotsRef.current[i].born > p5.random(1, childDotsLifeExpectency)) {
                    dotsRef.current.splice(i, 1);
                }
            }

            initPosRef.current += dotSpeed; // increase angle to move the dot
            if (initPosRef.current >= p5.TWO_PI) { // if angle is more than 2PI (a full circle)
                initPosRef.current = 0; // reset angle
            }

            canvasAngleRef.current += canvasRotationSpeed; // increase rotation speed
            if (canvasAngleRef.current >= p5.TWO_PI) { // if rotation speed is more than 2PI (a full circle)
                canvasAngleRef.current = 0; // reset rotation speed
            }
        }
    };

    return (
        <main className="flex flex-col min-h-screen items-center p-4 sm:p-18 gap-y-8">
            <div className="flex flex-col items-center mx-4 sm:mx-2 mb-3">
                <h1 className="text-2xl font-semibold">
                    The Art of Elliptical Orbits
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    Welcome to our interactive p5.js canvas! Here, we&#39;re simulating the mesmerizing dance of celestial bodies as they move in elliptical orbits. The main dot represents a celestial body, and its path forms an elliptical orbit. The smaller dots that occasionally appear represent other bodies influenced by the main body&#39;s gravitational pull.
                </p>
                <p className="text-lg text-gray-600 mt-2">
                    This simulation is powered by p5.js, a JavaScript library that makes coding visual and interactive sketches accessible to artists, designers, educators, and beginners. We invite you to tinker with the settings below to see how they affect the celestial dance. Change the size of the main dot, its speed, or the speed of the canvas rotation, and watch as the scene transforms before your eyes. Enjoy the exploration!
                </p>
            </div>
            <div className="flex flex-col items-center justify-center mx-4 sm:mx-2 mb-3">
                <Sketch setup={setup} draw={draw}/>
            </div>
            <div className="flex flex-col items-center justify-center mx-4 sm:mx-2 mb-3">
                <div className={horizontalSizeClasses}>
                    <label htmlFor="setSize">
                        Size of the main dot:      
                    </label>
                    <input id="setSize" type="number" min="0" max="80" value={size} onChange={(e) => setSize(Number(e.target.value))} className={inputClasses}/>
                </div>
                <div className={horizontalEventSizeClasses}>
                    <label htmlFor="setFreqPop">
                        Frequency of dots popping up:
                    </label>
                    <input id="setFreqPop" type="number" min="0" max="1" step="0.01" value={freqPop} onChange={(e) => setFreqPop(Number(e.target.value))} className={inputClasses}/>
                </div>
                <div className={horizontalEventSizeClasses}>
                    <label htmlFor="setDotSpeed">
                        Speed of the main dot:
                    </label>
                    <input id="setDotSpeed" type="number" min="0" max="1" step="0.01" value={dotSpeed} onChange={(e) => setDotSpeed(Number(e.target.value))} className={inputClasses}/>
                </div>
                <div className={horizontalEventSizeClasses}>
                    <label htmlFor='setCanvasRotationSpeed'>
                        Speed of the rotation of the canvas:
                    </label>
                    <input id="setCanvasRotationSpeed" type="number" min="0" max="0.5" step="0.001" value={canvasRotationSpeed} onChange={(e) => setCanvasRotationSpeed(Number(e.target.value))} className={inputClasses}/>
                </div>
                <div className={horizontalSizeClasses}>
                    <label htmlFor="setChildDotsExpectency">
                        Life expectency of the child dots:
                    </label>
                    <input id="setChildDotsExpectency" type="number" min="0" max="1000" step="10" value={childDotsLifeExpectency} onChange={(e) => setChildDotsLifeExpectency(Number(e.target.value))} className={inputClasses}/>
                </div>
                <div className={horizontalSizeClasses}>
                    <label htmlFor="setExplode">
                        Explode factor:
                    </label>
                    <input id="setExplode" type="number" min="0" max="10" step="0.1" value={explode} onChange={(e) => setExplode(Number(e.target.value))} className={inputClasses}/>
                </div>
            </div>  
        </main>
    )
};