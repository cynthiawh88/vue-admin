import Login from '@/pages/Login'
import Admin from '@/pages/Admin'
import Dashboard from '@/pages/Dashboard'
import User from '@/pages/User';
import Role from '@/pages/Role';
import Power from '@/pages/Power';
import NotFound from '@/pages/NotFound';

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
        path: '/admin/404',
        name: 'NotFound',
        component: NotFound,
        meta: {
          aliasName: '404',
          auth: true
        }
      },
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
          power: 'superadmin',
          auth: true
        }
      },
      {
        path: '/admin/role',
        name: 'Role',
        component: Role,
        meta: {
          aliasName: '角色列表',
          power: 'superadmin',
          auth: true
        }
      },
      {
        path: '/admin/power',
        name: 'Power',
        component: Power,
        meta: {
          aliasName: '权限列表',
          power: 'superadmin',
          auth: true
        }
      }
    ]
  }
];
export default routes;