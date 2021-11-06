import React from 'react';
import classNames from 'classnames';

// import styles
import { withStyles } from '@material-ui/core';
import HomeButtonStyles from '../../styles/js/HomeButtonStyles';

const AppStoreTopButton = ({ classes }) => {
    return (
        <div className={classNames(classes.topButtonContainer, classes.topAppStorePadding, classes.buttonEffect)}>
            <svg width="100%" height="100%" viewBox="0 0 109 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                    <path d="M20.0097 26.8801C18.4648 28.3529 16.7603 28.1233 15.1356 27.4289C13.4083 26.7205 11.8292 26.6757 10.005 27.4289C7.73322 28.3921 6.52752 28.1121 5.15935 26.8801C-2.56511 19.0681 -1.42497 7.16808 7.35413 6.72008C9.48334 6.83208 10.9741 7.87647 12.2282 7.96327C14.0924 7.59087 15.8767 6.52408 17.8719 6.66407C20.2691 6.85448 22.062 7.78408 23.2591 9.45568C18.328 12.3677 19.4966 18.7517 24.0259 20.5437C23.1194 22.8817 21.9565 25.1917 20.0069 26.8997L20.0097 26.8801ZM12.0572 6.63608C11.8263 3.16408 14.6909 0.308076 17.986 0.0280762C18.4392 4.03208 14.2805 7.02808 12.0572 6.63608Z" fill="white" />
                </g>
                <path d="M37.328 16.184L37.808 14.6C38.192 13.32 38.56 12.024 38.896 10.68H38.96C39.328 12.008 39.68 13.32 40.08 14.6L40.544 16.184H37.328ZM41.984 21H43.952L40.048 9.224H37.904L34 21H35.888L36.896 17.64H40.992L41.984 21ZM45.3451 24.568H47.1691V21.72L47.1211 20.216C47.8731 20.856 48.6571 21.208 49.4411 21.208C51.4251 21.208 53.2331 19.48 53.2331 16.456C53.2331 13.752 51.9851 11.976 49.7451 11.976C48.7691 11.976 47.8091 12.52 47.0411 13.16H46.9931L46.8491 12.2H45.3451V24.568ZM49.0891 19.688C48.5451 19.688 47.8571 19.48 47.1691 18.888V14.584C47.9211 13.864 48.5771 13.512 49.2651 13.512C50.7371 13.512 51.3291 14.648 51.3291 16.488C51.3291 18.552 50.3691 19.688 49.0891 19.688ZM55.4233 24.568H57.2473V21.72L57.1993 20.216C57.9513 20.856 58.7352 21.208 59.5193 21.208C61.5033 21.208 63.3113 19.48 63.3113 16.456C63.3113 13.752 62.0633 11.976 59.8233 11.976C58.8473 11.976 57.8873 12.52 57.1193 13.16H57.0713L56.9273 12.2H55.4233V24.568ZM59.1673 19.688C58.6233 19.688 57.9353 19.48 57.2473 18.888V14.584C57.9993 13.864 58.6553 13.512 59.3433 13.512C60.8153 13.512 61.4073 14.648 61.4073 16.488C61.4073 18.552 60.4473 19.688 59.1673 19.688ZM72.6151 21.208C75.1911 21.208 76.7591 19.672 76.7591 17.784C76.7591 16.056 75.7511 15.192 74.3591 14.6L72.7431 13.912C71.7831 13.528 70.8391 13.144 70.8391 12.136C70.8391 11.192 71.6231 10.616 72.8231 10.616C73.8631 10.616 74.6791 11.016 75.4151 11.672L76.3911 10.488C75.4951 9.576 74.1991 9 72.8231 9C70.5831 9 68.9511 10.392 68.9511 12.248C68.9511 13.96 70.2151 14.856 71.3511 15.336L72.9831 16.04C74.0711 16.52 74.8711 16.856 74.8711 17.928C74.8711 18.92 74.0711 19.592 72.6471 19.592C71.5111 19.592 70.3591 19.048 69.5111 18.2L68.4231 19.48C69.4951 20.568 70.9991 21.208 72.6151 21.208ZM81.3364 21.208C81.9764 21.208 82.5684 21.048 83.0644 20.888L82.7284 19.528C82.4724 19.64 82.0884 19.736 81.7844 19.736C80.8724 19.736 80.5044 19.192 80.5044 18.136V13.672H82.7924V12.2H80.5044V9.768H78.9524L78.7444 12.2L77.3844 12.296V13.672H78.6644V18.12C78.6644 19.976 79.3524 21.208 81.3364 21.208ZM87.9745 21.208C90.1505 21.208 92.1185 19.528 92.1185 16.616C92.1185 13.672 90.1505 11.976 87.9745 11.976C85.7985 11.976 83.8305 13.672 83.8305 16.616C83.8305 19.528 85.7985 21.208 87.9745 21.208ZM87.9745 19.704C86.5985 19.704 85.7345 18.472 85.7345 16.616C85.7345 14.744 86.5985 13.496 87.9745 13.496C89.3665 13.496 90.2305 14.744 90.2305 16.616C90.2305 18.472 89.3665 19.704 87.9745 19.704ZM94.2826 21H96.1066V15.512C96.6666 14.12 97.5306 13.624 98.2506 13.624C98.6026 13.624 98.8266 13.672 99.1306 13.768L99.4666 12.168C99.1946 12.04 98.9066 11.976 98.4746 11.976C97.5306 11.976 96.6026 12.648 95.9786 13.784H95.9306L95.7866 12.2H94.2826V21ZM104.322 21.208C105.474 21.208 106.482 20.824 107.298 20.28L106.658 19.112C106.018 19.528 105.346 19.768 104.562 19.768C103.042 19.768 101.986 18.76 101.842 17.08H107.554C107.602 16.872 107.634 16.504 107.634 16.152C107.634 13.656 106.386 11.976 104.05 11.976C101.986 11.976 100.034 13.752 100.034 16.616C100.034 19.512 101.938 21.208 104.322 21.208ZM101.826 15.816C102.002 14.264 102.978 13.416 104.082 13.416C105.362 13.416 106.05 14.296 106.05 15.816H101.826Z" fill="#FDFDFD" />
                <defs>
                    <clipPath id="clip0">
                        <rect width="24" height="28" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        </div>
    );
}

export default withStyles(HomeButtonStyles)(AppStoreTopButton);