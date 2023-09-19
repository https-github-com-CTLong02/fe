import axiosClient from './AxiosClient';

const UserApi = {
    createUser: (params) => {
        const url = 'user/create-user';
        return axiosClient.post(url, params);
    },
    getInforUser: () => {
        const url = 'user/get-info-user';
        return axiosClient.get(url);
    },
    getListUser: () => {
        const url = 'user/get-list-user';
        return axiosClient.get(url);
    },
};
export default UserApi;
