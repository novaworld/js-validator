import { isObject, isString } from "lodash-es";
import isJSONStr from './isJSONStr'

function isJSON(value) {
    if (isObject(value)) value = JSON.stringify(value)
    return isJSONStr(value)
}

export default isJSON