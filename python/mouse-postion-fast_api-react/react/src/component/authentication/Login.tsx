
// material-ui
import { Divider, Grid, Stack, Typography } from '@mui/material';

// project imports
import AuthWrapper1 from './AuthWrapper1';
// import AuthCardWrapper from './AuthCardWrapper';
import AuthLogin from './AuthLoginForm';
// import useAuth from 'hooks/useAuth';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const matchDownSM = true
    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            {/* <AuthCardWrapper> */}
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                         
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color='primary'
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Hi, Welcome Back
                                                    </Typography>
                                  
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLogin loginProp={0}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <AuthLogin loginProp={1}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLogin loginProp={2}/>
                                    </Grid> */}
                                
                         
                                </Grid>
                            {/* </AuthCardWrapper> */}
                        </Grid>
                    </Grid>
                </Grid>
         
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;