import axios, { AxiosResponse } from 'axios';

import conf from 'config';
import React from 'react';
import { Coords, CoordsList } from 'types';

export const API = axios.create({
    baseURL: conf.base_url
   
});
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
const get_error = (error: any): string => JSON.stringify((error.response.data && error.response.data.detail) || error.response).toString();
const HocApi = () => {

    const send_coords_and_get_list_of_all_user = React.useCallback(async (body: Coords = { x: 0, y: 0 }) => {
        try {
            const ans: AxiosResponse<CoordsList> = await API.post(`update`, body);
            return ans.data.coords_list;
        } catch (error: any) {
            return error.response ?get_error(error):error.message;
        }
    }, []);

    return { send_coords_and_get_list_of_all_user };
};
export default HocApi;
