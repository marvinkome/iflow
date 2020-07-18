import React, { useState, useContext, useEffect } from "react"
import {
    AiOutlineRadiusBottomleft,
    AiOutlineRadiusBottomright,
    AiOutlineRadiusUpleft,
    AiOutlineRadiusUpright,
} from "react-icons/ai"
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

                {/* border-radius */}
                <label title="top left corner radius" htmlFor="topLeftRadius" className="option">
                    <span>
                        <AiOutlineRadiusUpleft className="icon" />
                    </span>
                    <input id="x-pos" type="number" defaultValue={5} />
                </label>

                <label title="top right corner radius" htmlFor="topRightRadius" className="option">
                    <span>
                        <AiOutlineRadiusUpright className="icon" />
                    </span>
                    <input id="x-pos" type="number" defaultValue={5} />
                </label>

                <label
                    title="bottom left corner radius"
                    htmlFor="bottomLeftRadius"
                    className="option"
                >
                    <span>
                        <AiOutlineRadiusBottomleft className="icon" />
                    </span>
                    <input id="x-pos" type="number" defaultValue={5} />
                </label>

                <label
                    title="bottom right corner radius"
                    htmlFor="bottomRightRadius"
                    className="option"
                >
                    <span>
                        <AiOutlineRadiusBottomright className="icon" />
                    </span>
                    <input id="x-pos" type="number" defaultValue={5} />
                </label>
            </div>
        </div>
    )
}
