
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'common/routes';

// store

// defaultTheme

// project imports
// import RTLLayout from 'ui-component/RTLLayout';

// auth provider
// import { FirebaseProvider } from 'contexts/FirebaseContext';
import { JWTProvider } from 'common/contexts/JWTContext';
// import { Auth0Provider } from 'contexts/Auth0Context';

 
// src/views/application/customer/OrderList.tsx
// src/views/application/users/account-profile/Profile1/index.tsx
// ==============================|| APP ||============================== //

const App = () => {

    return (
        <StyledEngineProvider injectFirst>
                <CssBaseline />
                        <JWTProvider>
                            <>
                                <Routes />
                            </>
                        </JWTProvider>
        </StyledEngineProvider>
    );
};

export default App;
