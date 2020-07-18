import React, { useState, useEffect } from "react"

const getRatio = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let ratio = 1

    if (e.ctrlKey || e.metaKey) {
        ratio = 100
    } else if (e.shiftKey) {
        ratio = 10
    }

    return ratio
}

type IProps = {
    label: string | JSX.Element
    id: string
    defaultValue?: number
    onChange?: (value?: number) => void
    min?: number
    max?: number
}

export function NumberInput(props: IProps) {
    const [value, setValue] = useState(parseInt(`${props.defaultValue}`, 10))

    useEffect(() => {
        setValue(parseInt(`${props.defaultValue}`, 10))
    }, [props.defaultValue])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10)

        setValue(value)
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 38) {
            e.preventDefault()

            const ratio = getRatio(e)
            const max = props.max || 10000
            const value = parseInt((e.target as any).value, 10) + ratio

            if (value > max) return

            setValue(value)
            props.onChange && props.onChange(value)
        } else if (e.keyCode === 40) {
            e.preventDefault()

            const ratio = getRatio(e)
            const min = props.min || 0
            const value = parseInt((e.target as any).value, 10) - ratio

            if (value < min) return

            setValue(value)
            props.onChange && props.onChange(value)
        } else if (e.keyCode === 13) {
            props.onChange && props.onChange(value)
        }
    }

    return (
        <label htmlFor={props.id} className="option">
            <span>{props.label}</span>
            <input
                id={props.id}
                min={props.min}
                max={props.max}
                type="number"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyPress}
                onBlur={() => props.onChange && props.onChange(value)}
            />
        </label>
    )
}
