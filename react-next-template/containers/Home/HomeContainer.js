import React from 'react';
import classNames from 'classnames';

// import components
import HomeHeader from '../../components/Home/HomeHeader';
import HomeTitle from '../../components/Home/HomeTitle';
import HomeSubTitle from '../../components/Home/HomeSubTitle';
import HomeContents from '../../components/Home/HomeContents';
import HomeFooter from '../../components/Home/HomeFooter';

// import styles
import { withStyles } from '@material-ui/core';
import HomeStyles from '../../styles/js/HomeStyles';

const HomeContainer = ({ classes }) => {
    return (
        <>
            <div className="waveContainer">
                {/* <!--Content before waves--> */}
                <div className={classNames("inner-header flex")} style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                    <div className={classes.mainRaised}>
                        <HomeHeader />
                        <div className={classNames(classes.titleContainer, "flex")}>
                            <div>
                                <HomeTitle />
                            </div>
                            <div className={classes.mockupContainer}>
                                <img alt="mockup" src="/static/images/home_header_mockup.jpg" style={{ width: "100%", height: '100%' }} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--Waves Container--> */}
                <div>
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                        </g>
                    </svg>
                </div>
            </div>
            <HomeSubTitle />
            <HomeContents />
            <HomeFooter />
        </>
    );
}

export default withStyles(HomeStyles)(HomeContainer);