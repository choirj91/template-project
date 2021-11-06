import { mainRaised } from './GlobalStyles';

const HomeStyles = {
    mainRaised,
    titleContainer: {
        marginTop: "102px",
        justifyContent: "space-between",
        flexDirection: "row",
        "@media (max-width: 1278px)": {
            justifyContent: "center",
            flexDirection: "column"
        }
    },
    titleDiv: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        "@media (max-width: 1278px)": {
            textAlign: "center",
            alignItems: "center",
        },
    },
    titleStyle: {
        lineHeight: "55px",
        fontSize: "38px",
        "@media (max-width: 1278px)": {
            fontSize: "44px",
            lineHeight: "65.12px",
        },
        "@media (max-width: 767px)": {
            fontSize: "25px",
            lineHeight: "37px",
        }
    },
    meTitle: {
        /* 나에게 */
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "normal",
        color: "#FDFDFD",
    },
    cafeTitle: {
        /* 알맞은 카페 */
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "bolder",
        color: "#FDFDFD",
    },
    serchTitle: {
        /* 를 찾다 */
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "normal",
        color: "#FDFDFD"
    },
    logo: {
        marginTop: "49px",
        width: 260,
        height: 36,
        "@media (max-width: 1278px)": {
            width: 302,
            height: 42,
            marginTop: "60px",
        },
        "@media (max-width: 767px)": {
            width: 176,
            height: 24,
            marginTop: "30px",
        }
    },
    appDownContainer: {
        position: "relative",
        marginTop: "92px",
        display: "flex",
        flexDirection: "row",
        "@media (max-width: 1278px)": {
            marginTop: "60px",
        },
        "@media (max-width: 767px)": {
            marginTop: "40px",
        }
    },
    mockupContainer: {
        marginTop: 0,
        width: 412,
        height: 526,
        "@media (max-width: 1278px)": {
            marginTop: 40,
            width: 392,
            height: 500,
        },
        "@media (max-width: 767px)": {
            marginTop: 40,
            width: 250,
            height: 318,
        }
    },
    subTitleContainer: {
        width: "100%",
        height: "31vw",
        backgroundImage: "url(/static/images/subtitle_union.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        zIndex: 2,
        marginTop: "-9vw",
        "@media (max-width: 1278px)": {
            marginTop: "-11vw",
        },
        "@media (max-width: 767px)": {
            marginTop: "-12vw",
        }
    }
}

export default HomeStyles;