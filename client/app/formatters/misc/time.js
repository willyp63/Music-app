import { isEmpty } from '../../util/misc/empty'

const EMPTY_RENDER_VALUE = '--'

export function formatTimeMinutesSeconds(totalSeconds) {
  if(isEmpty(totalSeconds)) return EMPTY_RENDER_VALUE
  let secondsStr = Math.floor(totalSeconds % 60).toString()
  if (secondsStr.length < 2) secondsStr = '0' + secondsStr
  return Math.floor(totalSeconds / 60) + ':' + secondsStr
}
