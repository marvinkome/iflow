import React from "react"
import {
    AiOutlineRadiusBottomleft,
    AiOutlineRadiusBottomright,
    AiOutlineRadiusUpleft,
    AiOutlineRadiusUpright,
} from "react-icons/ai"

type IProps = {
    activeObject?: fabric.Object
}

export class FrameDesign extends React.Component<IProps> {
    state = {
        xPos: 0,
        yPos: 0,
        width: 0,
        height: 0,
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        this.setState({ [e.target.id]: e.target.value })
    }

    render() {
        return (
            <div className="frame control">
                <p>Frame</p>

                <div className="options">
                    <label htmlFor="xPos" className="option">
                        <span>X</span>
                        <input
                            id="xPos"
                            type="number"
                            value={this.state.xPos}
                            onChange={this.onChange}
                        />
                    </label>

                    <label htmlFor="yPos" className="option">
                        <span>Y</span>
                        <input
                            id="yPos"
                            type="number"
                            value={this.state.yPos}
                            onChange={this.onChange}
                        />
                    </label>

                    <label htmlFor="width" className="option">
                        <span>W</span>
                        <input
                            id="width"
                            type="number"
                            value={this.state.width}
                            onChange={this.onChange}
                        />
                    </label>

                    <label htmlFor="height" className="option">
                        <span>H</span>
                        <input
                            id="height"
                            type="number"
                            value={this.state.height}
                            onChange={this.onChange}
                        />
                    </label>

                    {/* border-radius */}
                    <label
                        title="top left corner radius"
                        htmlFor="topLeftRadius"
                        className="option"
                    >
                        <span>
                            <AiOutlineRadiusUpleft className="icon" />
                        </span>
                        <input id="x-pos" type="number" defaultValue={5} />
                    </label>

                    <label
                        title="top right corner radius"
                        htmlFor="topRightRadius"
                        className="option"
                    >
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
}
