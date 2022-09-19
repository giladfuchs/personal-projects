import {   CardProps } from '@mui/material';
import { KeyedObject } from 'types';


export type ScaleProps = {
    hover: number | string | undefined;
    tap: number | string | undefined;
};

export interface AnimateButtonProps {
    children?: React.ReactNode;
    type?: 'slide' | 'scale' | 'rotate';
    direction?: 'up' | 'down' | 'left' | 'right';
    offset?: number;
    scale?: ScaleProps;
}




export interface AuthRes  {
    access_token: string
    username: string
}


export interface MainCardProps extends KeyedObject {
    children: React.ReactNode | string;
    sx?: CardProps['sx'];
}
