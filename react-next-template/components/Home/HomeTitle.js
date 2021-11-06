import React from 'react';
import { appStoreUrl, googlePlayUrl } from '../../config/config';

// import components
import AppStoreTopButton from './AppStoreTopButton';
import GooglePlayTopButton from './GooglePlayTopButton';
import Link from '../Link';
import IconSampleLogo from '../Icon/IconSampleLogo';

// import styles
import { withStyles } from '@material-ui/core';
import HomeStyles from '../../styles/js/HomeStyles';

const HomeTitle = ({ classes }) => {
    return (
        <div className={classes.titleDiv}>
            {/* title */}
            <div className={classes.titleStyle}>
                <div className={classes.meTitle}>최상단</div>
                <div>
                    <span className={classes.cafeTitle}>제목</span>
                    <span className={classes.serchTitle}>입니다.</span>
                </div>
            </div>
            {/* logo */}
            <div className={classes.logo}>
                <IconSampleLogo style={{filter: "brightness(2)"}}/>
            </div>
            <div className={classes.appDownContainer}>
                <Link target="_blank" href={googlePlayUrl} className={classes.headerLeftLogo}>
                    <GooglePlayTopButton />
                </Link>
                <Link target="_blank" href={appStoreUrl} className={classes.headerLeftLogo}>
                    <AppStoreTopButton />
                </Link>
            </div>
        </div>
    )
}

export default withStyles(HomeStyles)(HomeTitle);