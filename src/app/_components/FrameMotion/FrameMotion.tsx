"use client";
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';


export default function FrameMotion({children}: { children: React.ReactNode }) {
    return (<>
        <AnimatePresence mode="wait">
            <motion.div
                key={typeof window !== "undefined" ? window.location.pathname : ""}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    </>)
}
