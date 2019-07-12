import { isString } from "lodash-es";
import _isJSON from 'validator/lib/isJSON';

function isJSONStr(value) {
    return isString(value) && _isJSON(value)
}

export default isJSONStr