import { TIP_HTML } from "../constant";

const initState = {}

export default function tipHtml(preState = initState, action) {
    const { type, data } = action
    switch (type) {
        case TIP_HTML:
            return { ...data }
        default:
            return preState
    }
}