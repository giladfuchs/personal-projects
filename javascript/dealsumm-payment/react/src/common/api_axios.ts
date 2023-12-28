import axios  from 'axios';

export const API = axios.create({
    baseURL: process.env.NODE_ENV === 'development'?'http://127.0.0.1:8000/':'https://django-payment.vercel.app/',
    withCredentials:true
});