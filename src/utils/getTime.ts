export function getTime() {
  let message = ''
  let h = new Date().getHours()
  if (h >= 5 && h < 9) {
    message = '早上好'
  } else if (h >= 9 && h < 11) {
    message = '上午好'
  } else if (h >= 11 && h < 14) {
    message = '中午好'
  } else if (h >= 14 && h < 18) {
    message = '下午好'
  } else {
    message = '晚上好'
  }
  return message
}
