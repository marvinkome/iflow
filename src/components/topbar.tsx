import React from "react"
import classnames from "classnames"
import { RiArtboard2Line, RiNavigationLine } from "react-icons/ri"
import { MdTextFields } from "react-icons/md"
import { Mode } from "types"
import "./topbar.scss"

type IProps = {
    mode: Mode
    onChangeMode: (mode: Mode) => void
}

export function Topbar(props: IProps) {
    return (
        <header className="topbar">
            <div className="controls">
                <div
                    onClick={() => props.onChangeMode(Mode.MOVE)}
                    className={classnames("control", { active: props.mode === Mode.MOVE })}
                >
                    <RiNavigationLine className="icon" />
                </div>

                <div
                    onClick={() => props.onChangeMode(Mode.DRAW)}
                    className={classnames("control", { active: props.mode === Mode.DRAW })}
                >
                    <RiArtboard2Line className="icon" />
                </div>

                <div
                    onClick={() => props.onChangeMode(Mode.TEXT)}
                    className={classnames("control", { active: props.mode === Mode.TEXT })}
                >
                    <MdTextFields className="icon" />
                </div>
            </div>

            <div className="title">
                <p>Title</p>
            </div>

            <div className="share">
                <p>Share</p>
            </div>
        </header>
    )
}
