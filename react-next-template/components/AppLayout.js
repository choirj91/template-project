import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

//core components import
import Footer from './Footer/Footer';

// import styles
import AppLayoutStyles from '../styles/js/AppLayoutStyles';

const AppLayout = memo(({ children, router, classes }) => {

    return (
        <div className={classes.main}>
            {children}
            {router && (router.route === '/policy/service' 
                        || router.route === '/policy/location' 
                        || router.route === '/policy/privacy') 
            ? null 
            : <Footer />}
        </div>
    );
});

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
    router: PropTypes.object.isRequired,
}

AppLayout.displayName = 'AppLayout';

export default withStyles(AppLayoutStyles)(AppLayout);