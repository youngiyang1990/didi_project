export const allMenu = [
  {
    name: '首页',
    url: 'admin',
    icon: 'home',
  }, {
    name: '司机模块',
    url: 'driver',
    icon: 'car',
    children: [
      { name: '司机管理', url: '/admin/drivers' },
    ]
  }]