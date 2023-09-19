import { toast } from 'react-toastify';

const toasts = {
    showSuccess: (message) => {
        toast.success(message, {
            toastId: 'success',
        });
    },
    showError: (message) => {
        toast.error(message, {
            toastId: 'error',
        });
    },
};
export default toasts;
