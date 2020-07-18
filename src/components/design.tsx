import React from "react"
import { FrameDesign } from "./frameDesign"
import "./design.scss"

type IProps = {
    activeObject?: fabric.Object
}

export class Design extends React.Component<IProps> {
    render() {
        return (
            <aside className="design">
                <h5>Design</h5>

                {this.props.activeObject && <FrameDesign activeObject={this.props.activeObject} />}
            </aside>
        )
    }
}
