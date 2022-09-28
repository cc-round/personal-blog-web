import { FIRM_DATA } from "../constant"

const initState = false
export default function firmOpen(preState = initState, action) {
    const { type, data } = action

    switch (type) {
        case FIRM_DATA:
            return data
        default:
            return preState
    }
}