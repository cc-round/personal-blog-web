import { FIRM_DATA } from "../constant"
import { EDITOR_TEXT } from "../constant"
import { HANDLE_TIP } from "../constant";
import { TIP_HTML } from "../constant";

export const editorText = data => ({ type: EDITOR_TEXT, data })
export const getOpen = data => ({ type: FIRM_DATA, data })
export const handleTip = data => ({ type: HANDLE_TIP, data })
export const tipHtml = data => ({ type: TIP_HTML, data })