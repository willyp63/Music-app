import { isEmpty } from '../../util/misc/empty'

/// Returnsed when [numOfSeconds] is empty.
const EMPTY_RENDER_VALUE = '--'

/// Returns a string in the format 'MM:SS' for the given # of seconds.
export const formatTimeMinutesSeconds = (numOfSeconds) => {
  if(isEmpty(numOfSeconds)) return EMPTY_RENDER_VALUE
  let secondsStr = Math.floor(numOfSeconds % 60).toString()
  if (secondsStr.length < 2) secondsStr = '0' + secondsStr
  return Math.floor(numOfSeconds / 60) + ':' + secondsStr
}
