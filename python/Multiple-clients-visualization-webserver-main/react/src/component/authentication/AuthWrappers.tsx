// material-ui
import { styled } from '@mui/material/styles';

import { Box } from '@mui/material';

import React, { Ref } from 'react';

// material-ui
import { Card } from '@mui/material';
import { MainCardProps } from 'types';



const MainCard = React.forwardRef(({ children, sx = {}, ...others }: MainCardProps, ref: Ref<HTMLDivElement>) => {
    return (
        <Card
            ref={ref}
            {...others}
            sx={{
                borderColor: 'purple',
                ':hover': {
                    boxShadow: 'inherit'
                },
                ...sx
            }}
        >
            {children}
        </Card>
    );
});

export const AuthCardWrapper = ({ children, ...other }: MainCardProps) => (
    <MainCard
        sx={{
            maxWidth: { xs: 400, lg: 475 },
            margin: { xs: 2.5, md: 3 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        {...other}
    >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
);


export const AuthWrapperGrid = styled('div')(({ theme }) => ({
    backgroundColor:   theme.palette.primary.light,
    minHeight: '100vh'
}));

