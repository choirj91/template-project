import React from 'react';
import classNames from 'classnames';
import {
    kakaoUrl, blogUrl, instagramUrl, companyAddress,
    bottomInfoEmail, downloadIntroductionUrl, enterStoreUrl
} from '../../config/config';

// import components
import Divider from '../Divider';
import Link from '../Link';

// import Icons
import IconKakaoChannel from '../Icon/IconKakaoChannel';
import IconNaverBlog from '../Icon/IconNaverBlog';
import IconInstagram from '../Icon/IconInstagram';
import IconSampleLogo from '../Icon/IconSampleLogo';

// import styles
import { withStyles } from '@material-ui/core';
import FooterStyles from '../../styles/js/FooterStyles';


const Footer = ({ classes }) => {
    return (
        <div className={classNames(classes.mainRaised, classes.footerContainer)}>
            {/* top start */}
            <div className={classNames(classes.footerTopDiv, "flex")}>
                <Link href={"/"}>
                    <IconSampleLogo className={classes.footerSampleLogo} />
                </Link>
                <div className={classNames(classes.topRightContainer, "flex")}>
                    <Link target="_blank" href={kakaoUrl} className={classes.headerRightButton}>
                        <IconKakaoChannel className={classes.topUrlButton} />
                    </Link>
                    <Link target="_blank" href={blogUrl} className={classes.headerRightButton}>
                        <IconNaverBlog className={classes.topUrlButton} />
                    </Link>
                    <Link target="_blank" href={instagramUrl} className={classes.headerRightButton}>
                        <IconInstagram className={classes.topUrlButton} />
                    </Link>
                </div>
            </div>
            {/* top end */}
            <Divider width={"100%"} className={classes.dividerStyle} />
            {/* bottom start */}
            <div className={classes.footerBottomDiv}>
                <div className={classes.footerDiv}>
                    <Link target="_blank" href={downloadIntroductionUrl} className={classes.bottomBoldText}>
                        <span>???????????? ??????</span>
                    </Link>
                    <Link target="_blank" href={enterStoreUrl} className={classes.bottomBoldText}>
                        <span>???????????? ??????</span>
                    </Link>
                </div>
                <div className={classes.footerDiv}>
                    <Link href="/policy/service" className={classes.bottomText}>
                        <span>????????????</span>
                    </Link>
                    <Link href="/policy/location" className={classes.bottomText}>
                        <span>????????????????????? ????????????</span>
                    </Link>
                    <Link href="/policy/privacy" className={classes.bottomText}>
                        <span>???????????? ????????????</span>
                    </Link>
                </div>
                <div className={classNames(classes.footerinfoContainer, classes.bottomText)}>
                    <div className={classes.footerinfodiv}>
                        <span className={classes.inforMargin}>{companyAddress}</span>
                        <span>{bottomInfoEmail}</span>
                    </div>
                    <div className={classes.footerinfodiv}>
                        <span>
                            {'Copyright ?? Company ' + new Date().getFullYear() + '. All Rights Reserved.'}
                        </span>
                    </div>
                </div>
            </div>
            {/* bottom end */}
        </div>
    )
}

export default withStyles(FooterStyles)(Footer);