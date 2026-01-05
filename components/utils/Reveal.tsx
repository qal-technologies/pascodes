"use client";

import React, {useEffect, useRef} from "react";
import {motion, useInView, useAnimation} from "framer-motion";

interface Props {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    glow?: boolean;
    glowRadius?:boolean | number
}

export const Reveal = ({children, width = "100%", delay = 0.25, glow = false, glowRadius = true}: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, amount: 0.2});

    const mainControls = useAnimation();

    useEffect(() => {
        if(isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} style={{position: "relative", width, overflow: "visible"}}>
            <motion.div
                variants={{
                    hidden: {opacity: 0, y: 30, filter: "blur(10px)"},
                    visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: {
                            type: "spring",
                            damping: 12,
                            stiffness: 100,
                            duration: 0.6,
                            delay: delay,
                            ease: "easeOut"
                        }
                    },
                }}
                initial="hidden"
                animate={mainControls}
                style={{
                    boxShadow: glow ? "0 0 20px rgba(58, 238, 187, 0.15)" : "none",
                    borderRadius: glow && glowRadius ? typeof glowRadius === 'number' ? glowRadius : "16px" : "0"
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
