import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'common/hooks/useAuth';
import { ReactElement, useEffect } from 'react';

type GuardProps = {
    children: ReactElement | null;
};

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('login', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export default AuthGuard;
