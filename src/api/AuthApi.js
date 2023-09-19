import axiosClient from './AxiosClient';

const AuthApi = {
    signIn: (params) => {
        const url = 'auth/login';
        return axiosClient.post(url, params);
    },
};
export default AuthApi;
