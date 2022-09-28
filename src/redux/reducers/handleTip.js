import { HANDLE_TIP } from "../constant";

const initState = false

export default function handleTip(preState = initState, action) {
    const { type, data } = action
    switch (type) {
        case HANDLE_TIP:
            return data
        default:
            return preState
    }
}