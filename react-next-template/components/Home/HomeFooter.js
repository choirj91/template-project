import React from 'react';
import classNames from 'classnames';
import { googlePlayUrl, appStoreUrl } from '../../config/config';

// import Button
import GooglePlayBottomButton from './GooglePlayBottomButton';
import AppStoreBottomButton from './AppStoreBottomButton';
import Link from '../Link';

// import styles
import { withStyles } from '@material-ui/core';
import HomeFooterStyles from '../../styles/js/HomeFooterStyles';

const HomeFooter = ({ classes }) => {
    return (
        <div className={classNames(classes.footerContainer, "flex")}>
            <div className={classes.footerRaised}>
                <div className={classes.homeFooterText}>
                    <p>Footer 상단</p>
                    <p><span style={{ fontWeight: 'bolder' }}>Footer</span>하단</p>
                </div>
                <div className={classNames(classes.rightContainer, "flex")}>
                    <div className={classNames(classes.rightRoot, "flex")}>
                        <p className={classes.rightText}>정사각형 사진</p>
                        <div className={classes.qrCodeDiv}>
                            <img alt="qrcode" src="/static/images/square_img.png" style={{ width: "100%", height: '100%' }} />
                        </div>
                    </div>
                    <div className={classNames(classes.rightRoot, "flex")} style={{ alignItems: "flex-start" }}>
                        <p className={classes.rightText}>앱 다운로드</p>
                        <Link target="_blank" href={googlePlayUrl}>
                            <GooglePlayBottomButton />
                        </Link>
                        <Link target="_blank" href={appStoreUrl}>
                            <AppStoreBottomButton />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withStyles(HomeFooterStyles)(HomeFooter);