import { lazy } from 'react';

import AuthGuard from 'common/route-guard/AuthGuard';
import Loadable from 'common/pages/Loadable';
import { Outlet } from 'react-router-dom';
    

const Board = Loadable(lazy(() => import('../../component/main/Main')));

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
        <Outlet />
        </AuthGuard>
    ),
    children: [
        {
            path: `/main`,
            element: <Board />
        }
    ]
};

export default MainRoutes;
