import React from 'react';
import classNames from 'classnames';

// import styles
import { withStyles } from '@material-ui/core';
import HomeSubStyles from '../../styles/js/HomeSubTitleStyles';

const HomeSubTitle = ({ classes }) => {
    return (
        <div className={classNames(classes.subTitleContainer, "flex")}>
            <div className={classes.rectangle} />
            <div className={classNames(classes.subTitleDiv, classes.subTitleStyle)}>
                <p className={classes.subTopFont}>상단 샘플</p>
                <p className={classes.subBottomFont}>내용입니다.</p>
            </div>
        </div>
    )
}

export default withStyles(HomeSubStyles)(HomeSubTitle);