import React, { useContext, useState } from "react"
import { ColorInput } from "components/reusable/colorInput"
import { AppContext } from "main/AppContext"

type IProps = {
    activeObject: fabric.Object
}

export function FillStrokeDesign({ activeObject }: IProps) {
    const canvas = useContext(AppContext)
    const onSelectColor = (color: string) => {
        activeObject.set("fill", color)
        canvas?.renderAll()
    }

    return (
        <>
            <div className="fill control">
                <p>Fill</p>

                <div className="options">
                    <ColorInput
                        defaultColor={activeObject.fill as string}
                        onSelectColor={onSelectColor}
                    />
                </div>
            </div>

            <div className="stroke control">
                <p>Stroke</p>
            </div>
        </>
    )
}
