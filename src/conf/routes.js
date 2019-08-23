
import Dashboard from '@/pages/dashboard/Dashboard';

const routes = [
  {
    path: '/home',
    name: '首页',
    icon: '',
    authority: ['admin', 'user', 'guest'],
    component: () => <div>home</div>,
    exact: false,
    // children: []
  },
  {
    path: '/dashboard',
    name: '联邦统计',
    icon: '',
    authority: ['admin', 'user', 'guest'],
    component: () => <Dashboard></Dashboard>,
    exact: false,
    children: []
  },
];

const Route = {
  path: '/',
  routes,
}

export default routes;