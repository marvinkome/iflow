import { fabric } from "fabric"

export const LabeledRect = fabric.util.createClass(fabric.Rect, {
    type: "labeledRect",

    initialize: function (options: any = {}) {
        this.callSuper("initialize", options)
        this.set("label", options.label || "")
    },

    toObject: function () {
        return fabric.util.object.extend(this.callSuper("toObject"), {
            label: this.get("label"),
        })
    },
})
