import React, { useRef, useEffect } from "react"

// create a
export function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        // all manipulation happens here
        const canvas = canvasRef.current!
        const ctx = canvas.getContext("2d")!
    }, [])

    return <canvas ref={canvasRef} id="iflow-canvas" width="150" />
}
