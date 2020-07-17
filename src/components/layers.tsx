import React from "react"
import { uniqBy } from "lodash"
import { RiArtboard2Line } from "react-icons/ri"

type IProps = {
    layers?: any[]
}

export function Layers(props: IProps) {
    // remove duplicate layers
    const layers = uniqBy(props.layers, "label")

    return (
        <aside className="layers">
            <h5>Layers</h5>

            <div className="layers-list">
                {layers?.map((layerObj, idx) => (
                    <p key={idx}>
                        {layerObj.type === "labeledRect" && <RiArtboard2Line className="icon" />}
                        <span>{layerObj.label}</span>
                    </p>
                ))}
            </div>
        </aside>
    )
}
