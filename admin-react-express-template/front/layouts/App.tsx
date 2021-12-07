import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import routes from '../pages/routes';
import theme from './theme';
import { Helmet } from 'react-helmet';
import "../assets/scss/admin.scss";
import { ToastContainer } from 'react-toastify';

const App = () => {
    const routing = useRoutes(routes);

    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>Admin Template</title>
            </Helmet>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {routing}
        </ThemeProvider>
    );
}

export default App;