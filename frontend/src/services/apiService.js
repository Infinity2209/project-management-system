import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const register = async (email, password, role) => {
    try {
        const response = await api.post('/auth/register', { email, password, role });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getCustomers = async () => {
    try {
        const response = await api.get('/customers');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getProjects = async () => {
    try {
        const response = await api.get('/admin/projects');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export default api;
