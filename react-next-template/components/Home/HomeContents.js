import React from 'react';
import classNames from 'classnames';

// import styles
import { withStyles } from '@material-ui/core';
import HomeContentsStyles from '../../styles/js/HomeContentsStyles';

// import Icons
import IconStore from '../Icon/IconStore';
import IconLocation from '../Icon/IconLocation';
import IconMagazine from '../Icon/IconMagazine';
import IconInformation from '../Icon/IconInformation';

const HomeContents = ({ classes }) => {
    return (
        <div className={classNames("flex")}>
            <div className={classNames("flex", classes.contentsRoot)}>
                <img alt="first_mockup" src="/static/images/first_mockup.jpg" style={{ width: "500px", height: 'auto' }} />
                <div className={classNames("flex", classes.contentsDiv, classes.firstContents)}>
                    <IconStore className={classes.contentsIcon} />
                    <div className={classes.contentsTitle}>
                        <div className={classes.large}>
                            <p>첫 번째</p>
                            <p>제목</p>
                        </div>
                        <div className={classes.medium}>
                            <p>첫 번째 제목</p>
                        </div>
                        <div className={classes.small}>
                            <p>첫 번째 제목</p>
                        </div>
                    </div>
                    <div className={classes.contentsText}>
                        <div className={classes.large}>
                            <p>첫 번째</p>
                            <p>내용 입니다.</p>
                            <p>입니다.</p>
                        </div>
                        <div className={classes.medium}>
                            <p>첫 번째</p>
                            <p>내용 입니다.</p>
                        </div>
                        <div className={classes.small}>
                            <p>첫 번째</p>
                            <p>내용 입니다.</p>
                            <p>입니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classNames("flex", classes.contentsRoot)}>
                <img className={classNames(classes.firstImage, classes.firstSwitch)} alt="second_mockup" src="/static/images/second_mockup.jpg" style={{ width: "500px", height: 'auto' }} />
                <div className={classNames("flex", classes.contentsDiv, classes.secondContents)}>
                    <IconLocation className={classes.contentsIcon} />
                    <div className={classes.contentsTitle}>
                        <div className={classes.large}>
                            <p>두 번째</p>
                            <p>제목</p>
                        </div>
                        <div className={classes.medium}>
                            <p>두 번째 제목</p>
                        </div>
                        <div className={classes.small}>
                            <p>두 번째 제목</p>
                        </div>
                    </div>
                    <div className={classes.contentsText}>
                        <div className={classes.large}>
                            <p>두 번째</p>
                            <p>내용</p>
                            <p>입니다.</p>
                        </div>
                        <div className={classes.medium}>
                            <p>두 번째 내용</p>
                            <p>입니다.</p>
                        </div>
                        <div className={classes.small}>
                            <p>두 번째</p>
                            <p>내용</p>
                            <p>입니다.</p>
                        </div>
                    </div>
                </div>
                <img className={classNames(classes.firstImage, classes.secondSwitch)} alt="second_mockup" src="/static/images/second_mockup.jpg" style={{ width: "500px", height: 'auto' }} />
            </div>
            <div className={classNames("flex", classes.contentsRoot)}>
                <img alt="third_mockup.jpg" src="/static/images/third_mockup.jpg" style={{ width: "500px", height: 'auto' }} />
                <div className={classNames("flex", classes.contentsDiv, classes.thirdContents)}>
                    <IconMagazine className={classes.contentsIcon} />
                    <div className={classes.contentsTitle}>
                        <div className={classes.large}>
                            <p>세 번째</p>
                            <p>제목</p>
                        </div>
                        <div className={classes.medium}>
                            <p>세 번째 제목</p>
                        </div>
                        <div className={classes.small}>
                            <p>세 번째</p>
                            <p>제목</p>
                        </div>
                    </div>
                    <div className={classes.contentsText}>
                        <div className={classes.large}>
                            <p>세 번째</p>
                            <p>내용</p>
                            <p>입니다.</p>
                            <p>안녕하세요.</p>
                        </div>
                        <div className={classes.medium}>
                            <p>세 번째 내용</p>
                            <p>입니다. 안녕하세요.</p>
                        </div>
                        <div className={classes.small}>
                            <p>세 번째</p>
                            <p>내용</p>
                            <p>입니다.</p>
                            <p>안녕하세요.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classNames("flex", classes.contentsRoot)}>
                <img className={classes.firstSwitch} alt="forth_mockup.jpg" src="/static/images/forth_mockup.jpg" style={{ width: "500px", height: 'auto' }} />
                <div className={classNames("flex", classes.contentsDiv, classes.forthContents)}>
                    <IconInformation className={classes.contentsIcon} />
                    <div className={classes.contentsTitle}>
                        <div className={classes.large}>
                            <p>네 번째</p>
                            <p>제목</p>
                        </div>
                        <div className={classes.medium}>
                            <p>네 번째 제목</p>
                        </div>
                        <div className={classes.small}>
                            <p>네 번째 제목</p>
                        </div>
                    </div>
                    <div className={classes.contentsText}>
                        <div className={classes.large}>
                            <p>네 번째</p>
                            <p>내용</p>
                            <p>입니다.</p>
                        </div>
                        <div className={classes.medium}>
                            <p>네 번째</p>
                            <p>내용 입니다.</p>
                        </div>
                        <div className={classes.small}>
                            <p>네 번째</p>
                            <p>내용 입니다.</p>
                        </div>
                    </div>
                </div>
                <img className={classes.secondSwitch} alt="forth_mockup.jpg" src="/static/images/forth_mockup.jpg" style={{ width: "500px", height: 'auto' }} />
            </div>
        </div>
    )
}

export default withStyles(HomeContentsStyles)(HomeContents);