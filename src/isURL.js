import URI from 'urijs'
import { isString } from 'lodash-es'

function isURL(value) {
    return isString(value) && URI(value).is('url')
}

export default isURL