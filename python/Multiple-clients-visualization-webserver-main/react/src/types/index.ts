import { ReactElement } from 'react';

export * from './context'
export * from './auth'
export * from './main'

export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};

export type GuardProps = {
    children: ReactElement | null;
};
