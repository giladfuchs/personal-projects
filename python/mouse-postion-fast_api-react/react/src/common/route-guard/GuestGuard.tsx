import { useNavigate } from 'react-router-dom';
import { ReactElement } from 'react';

// project imports
import useAuth from '../hooks/useAuth';

import { useEffect } from 'react';

type GuardProps = {
    children: ReactElement | null;
};
/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: GuardProps) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        
        const path = isLoggedIn? 'main': 'login';
        navigate(path, { replace: true });
            

    }, [isLoggedIn, navigate]);

    return children;
};

export default GuestGuard;
