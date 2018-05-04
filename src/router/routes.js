import Login from '@/pages/Login'
import Admin from '@/pages/Admin'
import Dashboard from '@/pages/Dashboard'
import User from '@/pages/User';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      aliasName: '登录',
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      aliasName: '控制台',
      auth: true
    },
    children: [
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          aliasName: '仪表盘',
          auth: true
        }
      },
      {
        path: '/admin/user',
        name: 'User',
        component: User,
        meta: {
          aliasName: '管理员列表',
          auth: true
        }
      },
      {
        path: '/admin/role',
        name: 'Role',
        component: Dashboard,
        meta: {
          aliasName: '角色列表',
          auth: true
        }
      }
    ]
  }
];
export default routes;