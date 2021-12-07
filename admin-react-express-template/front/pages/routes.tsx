import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import NotFound from '@pages/Errors/NotFound';
import LoginRegister from '@pages/LoginRegister';
import AdminList from '@pages/AdminList';
import Account from '@pages/Account';
import CafesRegister from '@pages/CafesRegister';
import CafesEdit from '@pages/CafesEdit';
import CafeList from '@pages/CafesList';
import Dashboard from '@pages/Dashboard';
import Notice from '@pages/Notice';
import NoticeRegister from '@pages/NoticeRegister';
import NoticeEdit from '@pages/NoticeEdit';
import Banners from '@pages/Banners';
import Magazines from '@pages/Magazines';
import MagazinesEdit from '@pages/MagazinesEdit';
import MagazinesRegister from '@pages/MagazinesRegister';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'notices', element: <Notice /> },
      { path: 'admin/list', element: <AdminList /> },
      { path: 'account', element: <Account /> },
      { path: 'cafes/list', element: <CafeList /> },
      { path: 'cafes/register', element: <CafesRegister /> },
      { path: 'cafes/edit/:id', element: <CafesEdit /> },
      { path: 'notices/register', element: <NoticeRegister /> },
      { path: 'notices/edit/:id', element: <NoticeEdit /> },
      { path: 'banners', element: <Banners /> },
      { path: 'magazines', element: <Magazines /> },
      { path: 'magazines/edit/:id', element: <MagazinesEdit /> },
      { path: 'magazines/register', element: <MagazinesRegister /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    children: [
      { path: 'login-register', element: <LoginRegister /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
