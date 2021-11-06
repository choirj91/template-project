import { mainRaised } from './GlobalStyles';

const FooterStyles = {
    mainRaised,
    footerContainer: {
        marginTop: "150px",
        marginBottom: "133px",
        "@media (max-width: 1278px)": {
            marginTop: "94px",
            marginBottom: "122px",
        },
        "@media (max-width: 767px)": {
            marginTop: "82px",
            marginBottom: "56px",
        }
    },
    /* top */
    footerTopDiv: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    footerSampleLogo: {
        width: "176px",
        heigth: "24px",
        "@media (max-width: 767px)": {
            width: "134px",
            heigth: "18px",
        }
    },
    topRightContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    topUrlButton: {
        width: "60px",
        heigth: "60px",
        "@media (max-width: 767px)": {
            width: "50px",
            heigth: "50px",
        }
    },
    dividerStyle: {
        marginTop: "30px",
        marginBottom: "20px",
        "@media (max-width: 767px)": {
            marginTop: "16px",
            marginBottom: "6px",
        },
    },
    /* bottom */
    footerBottomDiv: {
        width: "100%",
        "@media (max-width: 1278px)": {
            display: "block",
        },
        "@media (max-width: 767px)": {
            display: "block",
        }
    },
    footerDiv: {
        display: "contents",
        "@media (max-width: 767px)": {
            display: "block",
            marginTop: "6px",
        }
    },
    bottomBoldText: {
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "bolder",
        fontSize: "14px",
        lineHeight: "21px",
        letterSpacing: "-0.02em",
        color: "#1D1D1D",
        marginRight: "38px",
        "@media (max-width: 1278px)": {
            marginRight: "16px",
            fontSize: "12px",
            lineHeight: "17px",
        },
    },
    bottomText: {
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "21px",
        letterSpacing: "-0.02em",
        color: "#828282",
        marginRight: "38px",
        "@media (max-width: 1278px)": {
            marginRight: "16px",
            fontSize: "12px",
            lineHeight: "17px",
        },
    },
    footerinfoContainer:{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: "10px",
        "@media (max-width: 1278px)": {
            marginTop: 0,
            flexDirection: "column",
            justifyContent: "center",
        },
    },
    footerinfodiv: {
        display: "block",
        "@media (max-width: 1278px)": {
            marginTop: "4px",
        },
    },
    inforMargin: {
        marginRight: "38px",
        "@media (max-width: 1278px)": {
            marginRight: "16px",
        },
    }
}

export default FooterStyles;