import axiosClient from './AxiosClient';

const BorrowingApi = {
    createBorrowing: (params) => {
        const url = 'borrowing/create-borrowing';
        return axiosClient.post(url, params);
    },
    listBorrowing: () => {
        const url = 'borrowing/list-borrowing';
        return axiosClient.get(url);
    },
    delelteBorrowing: (params) => {
        const url = 'borrowing/delete-borrowing';
        return axiosClient({
            method: 'delete',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            url: url,
            data: params,
        });
    },
};
export default BorrowingApi;
