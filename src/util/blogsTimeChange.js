const obj = {
  1: '今天发布',
  2: '一周内发布',
  3: '一月内发布',
  4: '一年内发布',
  5: '两年内发布',
}
function changetimename(key) {
  return obj[key]
}
export default changetimename
