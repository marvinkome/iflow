import React, { useState, useEffect } from "react"
import { ChromePicker, ColorResult } from "react-color"
import { fabric } from "fabric"

type IProps = {
    defaultColor: string
    onSelectColor: (color: string) => void
}

function rgbToHex(rgb: string) {
    return new fabric.Color(rgb).toHexa()
}

function hexToPercent(hex: string) {
    const alpha = hex.substring(hex.length, hex.length - 2)
    return Math.floor((parseInt(alpha, 16) / 255) * 100)
}

export function ColorInput(props: IProps) {
    const [showPicker, setShowPicker] = useState(false)
    const [color, setColor] = useState(props.defaultColor)

    const onColorChange = (color: ColorResult) => {
        const newColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
        setColor(newColor)
        props.onSelectColor(newColor)
    }

    const onClose = () => {
        setShowPicker(false)
        props.onSelectColor(color)
    }

    return (
        <>
            <div className="color-option" onClick={() => setShowPicker(true)}>
                <div style={{ backgroundColor: color }} className="color-preview" />
                <span>{rgbToHex(color).substring(0, 6)}</span>
                <span className="alpha">{hexToPercent(rgbToHex(color))}%</span>
            </div>

            {showPicker && (
                <div className="color-picker">
                    {/* full body cover */}
                    <div className="cover" onClick={onClose} />

                    <ChromePicker color={rgbToHex(color)} onChange={onColorChange} />
                </div>
            )}
        </>
    )
}
