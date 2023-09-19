import { Routes, Route } from 'react-router-dom';
import ManageAccount from './MangeAccount';
import { useSelector } from 'react-redux';
import AccountInfor from './AccountInfor';
import Footer from '~/app/components/Footer';

function ManageAccountRouter() {
    const account = useSelector((state) => state.app.account);
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        account?.role === 'admin' ? <ManageAccount></ManageAccount> : <AccountInfor></AccountInfor>
                    }
                ></Route>
            </Routes>
            <Footer></Footer>
        </>
    );
}

export default ManageAccountRouter;
