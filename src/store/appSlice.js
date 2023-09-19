import { createSlice } from '@reduxjs/toolkit';
import { updateAccessToken } from '~/api/AxiosClient';

const initialState = {
    isLogin: localStorage.getItem('access_Token') ? true : false,
    account: undefined,
    books: undefined,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.isLogin = true;
            updateAccessToken(action.payload);
            localStorage.setItem('access_token', action.payload);
        },
        signOut: (state) => {
            state.isLogin = false;
            state.books = undefined;
            state.account = undefined;
            localStorage.removeItem('access_token');
        },
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        setBooks: (state, action) => {
            state.books = [...action.payload];
        },
    },
});

export const { signIn, signOut, setAccount } = appSlice.actions;
export default appSlice.reducer;
