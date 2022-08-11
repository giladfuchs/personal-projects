import { lazy } from 'react';

// project imports
import GuestGuard from 'common/route-guard/GuestGuard';
import Loadable from 'common/pages/Loadable';
import { Outlet } from 'react-router-dom';
 

// login routing
const AuthLogin = Loadable(lazy(() => import('../../component/authentication/Login')));

const LoginRoutes = {
    path: '/',
    element: (
            <GuestGuard>
       <Outlet />
            </GuestGuard>
    ),
    children: [
        {
            path: `/login`,
            element: <AuthLogin />
        },]
};

export default LoginRoutes;
