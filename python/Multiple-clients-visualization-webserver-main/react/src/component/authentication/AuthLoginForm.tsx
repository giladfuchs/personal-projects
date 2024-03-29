import React from 'react';

// material-ui
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Divider
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';

import useAuth from 'common/hooks/useAuth';
import useScriptRef from 'common/hooks/useScriptRef';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const AuthLoginForm = ({ ...others }) => {

    const { login } = useAuth();
    const scriptedRef = useScriptRef();


    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault()!;
    };
    const user_pass = { username: '', password: '',}
 
        return (
        <Formik
            initialValues={{
                ...user_pass,
  
                submit: null
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string().max(255).required('Username is required'),
                password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await login(values.username, values.password.trim());

                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                    }
                } catch (err: any) {
                    console.error(err);
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth sx={{mb:2}} error={Boolean(touched.username && errors.username)}  >
                        <InputLabel htmlFor="outlined-adornment-email-login">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="username"
                            value={values.username}
                            name="username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.username && errors.username && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {errors.username}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Divider />

                    <FormControl fullWidth error={Boolean(touched.password && errors.password)}  >
                        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                            label="Password"
                        />
                        {touched.password && errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>

                   
                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                            <Button color="secondary" disabled={[values.username, values.password].includes('')  || isSubmitting} fullWidth size="large" type="submit" variant="contained">
                            Login
                            </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default AuthLoginForm;
