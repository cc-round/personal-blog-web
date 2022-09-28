import { EDITOR_TEXT } from "../constant";

const initState = ''

export default function getText(preState = initState, action) {
    const { type, data } = action
    switch (type) {
        case EDITOR_TEXT:
            return data
        default:
            return preState
    }
}