
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import Routes from 'common/routes';
 
import { JWTProvider } from 'common/contexts/JWTContext';
 

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
