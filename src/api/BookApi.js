import axiosClient from './AxiosClient';

const BookApi = {
    createBook: (params) => {
        const url = 'book/create-book';
        return axiosClient({
            method: 'post',
            url: url,
            headers: { 'Content-Type': 'multipart/form-data' },
            data: params,
        });
    },
    getBooks: () => {
        const url = 'book/list-book';
        return axiosClient.get(url);
    },
    updateBook: (params) => {
        const url = 'book/update-book';
        return axiosClient.put(url, params);
    },
    deleteBook: (params) => {
        const url = 'book/delete-book';
        return axiosClient.delete(url, params);
    },
};
export default BookApi;
