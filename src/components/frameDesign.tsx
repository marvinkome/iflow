import React, { useState, useContext, useEffect } from "react"
import { NumberInput } from "components/reusable/numberInput"
import { AppContext } from "main/AppContext"

type IProps = {
    activeObject: fabric.Object
}

export function FrameDesign({ activeObject }: IProps) {
    const canvas = useContext(AppContext)
    const [frameCoords, setFrameCoords] = useState({
        left: activeObject.left,
        top: activeObject.top,
        width: activeObject.getScaledWidth(),
        height: activeObject.getScaledHeight(),
    })

    // listen for frame changes
    useEffect(() => {
        canvas?.on("object:modified", (e) => {
            setFrameCoords({
                width: e.target?.getScaledWidth() || 0,
                height: e.target?.getScaledHeight() || 0,
                left: e.target?.left,
                top: e.target?.top,
            })
        })
    })

    // update frame
    const saveEvent = (id: "left" | "top" | "width" | "height", value?: number) => {
        setFrameCoords({ ...frameCoords, [id]: value })
        activeObject.set({ [id]: value })
        activeObject.setCoords()
        canvas?.renderAll()
    }

    return (
        <div className="frame control">
            <p>Frame</p>

            <div className="options">
                <NumberInput
                    label="X"
                    id="left"
                    defaultValue={frameCoords.left}
                    onChange={(val) => saveEvent("left", val)}
                />

                <NumberInput
                    label="Y"
                    id="top"
                    defaultValue={frameCoords.top}
                    onChange={(val) => saveEvent("top", val)}
                />

                <NumberInput
                    label="W"
                    id="width"
                    defaultValue={frameCoords.width}
                    onChange={(val) => saveEvent("width", val)}
                />

                <NumberInput
                    label="H"
                    id="height"
                    defaultValue={frameCoords.height}
                    onChange={(val) => saveEvent("height", val)}
                />
            </div>
        </div>
    )
}
