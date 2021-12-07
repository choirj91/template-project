import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const successToast = (title: string) => toast.dark(title, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export {
    successToast
}