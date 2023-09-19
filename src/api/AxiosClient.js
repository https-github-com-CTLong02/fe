import axios from 'axios';
import queryString from 'query-string';
import AppConfig from '~/app/AppConfig';
import toasts from '~/app/components/Toast';

const sTag = '[AxiosClient]';
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response.headers['session-token']) {
            axiosClient.defaults.headers.common['session-token'] = response.headers['session-token'];
        }
        if (response && response.data) {
            if (response.status === 201) {
                return response.data;
            }
            return response;
        }
    },
    (err) => {
        console.log('err', err);
        if (err.response && err.response.data) {
            const { message } = err.response.data;
            console.log('message', message);
            toasts.showError(message);
        }
    },
);

const updateAccessToken = (accessToken) => {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

(() => {
    if (localStorage.getItem('access_token')) {
        updateAccessToken(localStorage.getItem('access_token'));
    }
})();
export { updateAccessToken };
export default axiosClient;
