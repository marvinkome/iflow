import React, { createRef } from "react"
import classnames from "classnames"
import panzoom, { PanZoom } from "panzoom"
import { fabric } from "fabric"
import { Mode } from "types"

import { Topbar } from "components/topbar"
import { Layers } from "components/layers"
import { Design } from "components/design"

// custom fabric objects
import { LabeledRect } from "./fabric-utils"

import { AppContext } from "./AppContext"
import "./App.scss"

/**
 * 1: have a full page context to draw on, page should be similar to a normal laptop screen
 *    by default we're going with a 1440 width screen. And then you can draw on this screen.
 *
 * 2: Have modes - drawing mode, text mode, move mode and pan mode
 *
 * 3: Have a button to automatically draw a rect inside the canvas
 *
 * 4: Have a button to move frames around
 *
 * 5: Have a container to list all rects inside the canvas
 *
 * 6: Have a way to design each frame
 *
 * 6a: Have a way to track which frame was selected
 *
 */

type StateType = {
    mode: Mode
    activeObject?: fabric.Object
}

export class MainApp extends React.Component {
    zoom: PanZoom | null = null
    canvas: fabric.Canvas | null = null
    canvasRef = createRef<HTMLCanvasElement>()
    frameCount = 0

    state: StateType = {
        mode: Mode.MOVE,
    }

    /**
     * Setup
     */
    setupCanvas = () => {
        this.canvas = new fabric.Canvas(this.canvasRef.current, {
            width: 1440,
            height: 950, // offset header
            backgroundColor: "#fff",
            selection: false,
            selectionColor: "transparent",
            selectionLineWidth: 2,
            enableRetinaScaling: true,
        })

        const selectEvent = (e: fabric.IEvent) => {
            this.setState({
                activeObject: e.target,
            })
        }

        // add state events
        this.canvas.on("selection:created", selectEvent)
        this.canvas.on("selection:updated", selectEvent)
        this.canvas.on("selection:cleared", () => this.setState({ activeObject: undefined }))

        const rect = new LabeledRect({
            width: 200,
            height: 200,
            top: 120,
            left: 50,
            label: `Frame ${this.frameCount++}`,
        })

        this.canvas.add(rect)
        this.canvas.setActiveObject(rect)
    }

    handleZoom = () => {
        const el = document.querySelector<HTMLDivElement>(".drawing-canvas")!
        this.zoom = panzoom(el, {
            // allow wheel-zoom only if altKey is down. Otherwise - ignore
            beforeWheel: (e) => !e.altKey,
            beforeMouseDown: (e) => !e.altKey,
            smoothScroll: false,
            transformOrigin: { x: 0.5, y: 0.5 },
        })

        // initial zoom
        this.zoom.zoomAbs(520, 50, 0.45)
    }

    /**
     * Modes functionality
     */
    drawMode = () => {
        let started = false
        let x = 0
        let y = 0

        // create rect object on mouse down
        this.canvas?.on("mouse:down", (e) => {
            const mouse = this.canvas?.getPointer(e.e)
            started = true
            x = mouse?.x as number
            y = mouse?.y as number

            const square = new LabeledRect({
                width: 0,
                height: 0,
                left: x,
                top: y,
                fill: "red",
                label: `Frame ${this.frameCount++}`,
            })

            this.canvas?.add(square)
            this.canvas?.renderAll()
            this.canvas?.setActiveObject(square)
        })

        this.canvas?.on("mouse:move", (e) => {
            if (!started) return false

            const mouse = this.canvas?.getPointer(e.e)!
            const w = Math.abs(mouse?.x - x)
            const h = Math.abs(mouse?.y - y)

            if (!w || !h) return false

            const square = this.canvas?.getActiveObject()
            square?.set("width", w).set("height", h)
            this.canvas?.renderAll()
        })

        this.canvas?.on("mouse:up", () => {
            if (started) {
                started = false
            }

            const square = this.canvas?.getActiveObject()!
            this.canvas?.add(square)
            this.canvas?.renderAll()

            // change mode
            this.changeMode(Mode.MOVE)
        })
    }

    moveMode = () => {
        // set movement true for all object
        const objects = this.canvas?.getObjects()

        objects?.forEach((object) => {
            object.lockMovementX = false
            object.lockMovementY = false
            object.lockRotation = false
        })
    }

    modesCleanUp = () => {
        this.canvas?.off("mouse:down")
        this.canvas?.off("mouse:move")
        this.canvas?.off("mouse:up")

        this.canvas?.getObjects().forEach((object) => {
            object.lockMovementX = true
            object.lockMovementY = true
            object.lockRotation = true
        })
    }

    changeMode = (mode: Mode) => {
        this.setState({ mode }, () => {
            // clean up
            this.modesCleanUp()

            if (this.state.mode === Mode.MOVE) {
                return this.moveMode()
            }

            if (this.state.mode === Mode.DRAW) {
                return this.drawMode()
            }

            if (this.state.mode === Mode.TEXT) {
            }
        })
    }

    /**
     * Life cycles
     */
    componentDidMount() {
        this.setupCanvas()
        this.handleZoom()
    }

    componentWillUnmount() {
        this.zoom?.dispose()
    }

    /**
     * Render
     */
    render() {
        return (
            <AppContext.Provider value={this.canvas}>
                <div className="main-container">
                    <Topbar mode={this.state.mode} onChangeMode={this.changeMode} />

                    <Layers layers={this.canvas?.getObjects()} />

                    <Design activeObject={this.state.activeObject} />

                    <div className={classnames("main-app", this.state.mode)}>
                        <div className="drawing-canvas">
                            <canvas ref={this.canvasRef} />
                        </div>
                    </div>
                </div>
            </AppContext.Provider>
        )
    }
}
