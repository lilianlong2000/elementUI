const obj = {
  navigatorOne: '博客列表',
  navigatorTwo: '天气预报',
  navigatorThree: '导航三',
  navigatorFour: '导航四',
  blogsdetail: '博客详情',
}
function changetitle(name) {
  return obj[name]
}
export default changetitle
