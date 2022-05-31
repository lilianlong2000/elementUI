const obj = {
  navigatorOne: '博客列表',
  navigatorTwo: '天气预报',
  navigatorThree: '导航三',
  navigatorFour: '系统设置',
  blogsdetail: '博客详情',
  modiselfinfo: '修改个人信息',
  publishblogs: '发布博客',
}
function changetitle(name) {
  return obj[name]
}
export default changetitle
