import { ToastContainer } from 'react-toastify';

function AppToast() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ fontSize: 12 }}
        ></ToastContainer>
    );
}

export default AppToast;
