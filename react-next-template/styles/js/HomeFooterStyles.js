import { mainRaised } from './GlobalStyles';

const HomeFooterStyles = {
    footerContainer: {
        width: "100%",
        height: "260px",
        marginTop: "245px",
        background: "linear-gradient(60deg, #adadad 0%, #343434 100%)",
        flexDirection: "row",
        justifyContent: "center",
        "@media (max-width: 1278px)": {
            marginTop: "300px",
            height: "208px",
        },
        "@media (max-width: 767px)": {
            marginTop: "206px",
            height: "190px",
        }
    },
    footerRaised: {
        ...mainRaised,
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        "@media (max-width: 767px)": {
            flexDirection: "column",
            padding: "0 10px",
        }
    },
    homeFooterText: {
        textAlign: "Left",
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "32px",
        lineHeight: "47px",
        color: "#FDFDFD",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        "@media (max-width: 1278px)": {
            fontSize: "28px",
            lineHeight: "41px",
        },
        "@media (max-width: 767px)": {
            fontSize: "20px",
            lineHeight: "30px",
        }
    },
    rightContainer: {
        flexDirection: "row",
        justifyContent: "center",
        "@media (max-width: 767px)": {
            justifyContent: "flex-start",
            marginTop: "28px"
        }
    },
    rightRoot: {
        marginLeft: "35px",
        flexDirection: "column",
        "@media (max-width: 767px)": {
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: 0,
        }
    },
    rightText: {
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "15px",
        lineHeight: "22px",
        color: "#FDFDFD",
        marginBottom: "20px",
        "@media (max-width: 1278px)": {
            display: 'none'
        },
    },
    qrCodeDiv: {
        width: "106px",
        height: "106px",
        "@media (max-width: 1278px)": {
            display: 'none'
        },
    },
}

export default HomeFooterStyles;