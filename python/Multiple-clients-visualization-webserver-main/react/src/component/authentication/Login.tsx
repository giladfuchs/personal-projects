
import {   Grid, Stack, Typography } from '@mui/material';

import {AuthWrapperGrid, AuthCardWrapper} from './AuthWrappers';
import AuthLogin from './AuthLoginForm';

const Login = () => {
    return (
        <AuthWrapperGrid>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                         
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction='row'
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color='primary'
                                                        gutterBottom
                                                        variant='h2'
                                                    >
                                                        Hi, Welcome Back
                                                    </Typography>
                                  
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLogin  />
                                    </Grid>
                                
            
                                
                         
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
         
            </Grid>
        </AuthWrapperGrid>
    );
};

export default Login;