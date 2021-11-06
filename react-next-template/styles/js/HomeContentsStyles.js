const HomeContentsStyles = {
    contentsContainer: {


    },
    contentsRoot: {
        flexDirection: "row",
        marginTop: "135px",
        "@media (max-width: 1278px)": {
            flexDirection: "column",
            marginTop: "160px",
        },
        "@media (max-width: 767px)": {
            flexDirection: "column",
            marginTop: "110px",
        }
    },
    contentsDiv: {
        flexDirection: "column",
        width: '100%',
        textAlign: "Left",
        alignItems: "flex-start",
        "@media (max-width: 1278px)": {
            textAlign: "center",
            alignItems: "center",
            marginTop: "58px",
        },
        "@media (max-width: 767px)": {
            flexDirection: "column",
            marginTop: "44px",
        }
    },
    firstContents: {
        marginLeft: 157,
        "@media (max-width: 1278px)": {
            marginLeft: 0,
        },
    },
    secondContents: {
        marginRight: 225,
        "@media (max-width: 1278px)": {
            marginRight: 0,
        },
    },
    thirdContents: {
        marginLeft: 200,
        "@media (max-width: 1278px)": {
            marginLeft: 0,
        },
    },
    forthContents: {
        marginRight: 188,
        "@media (max-width: 1278px)": {
            marginRight: 0,
        },
    },
    contentsIcon: {
        width: "60px",
        height: "60px",
        "@media (max-width: 767px)": {
            width: "32px",
            height: "32px",
        }
    },
    contentsTitle: {
        marginTop: "36px",
        color: "#1d1d1d",
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "bolder",
        fontSize: "28px",
        lineHeight: "41px",
        "@media (max-width: 1278px)": {
            fontSize: "28px",
            lineHeight: "41px",
        },
        "@media (max-width: 767px)": {
            fontSize: "18px",
            lineHeight: "26px",
        }
    },
    large: {
        display: "inherit",
        "@media (max-width: 1278px)": {
            display: 'none'
        },
    },
    medium: {
        display: "none",
        "@media (max-width: 1278px)": {
            display: 'inherit'
        },
        "@media (max-width: 767px)": {
            display: "none",
        },
    },
    small: {
        display: "none",
        "@media (max-width: 767px)": {
            display: 'inherit'
        },
    },
    contentsText: {
        marginTop: "48px",
        color: "#828282",
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "20px",
        lineHeight: "30px",
        "@media (max-width: 1278px)": {
            fontSize: "20px",
            lineHeight: "30px",
        },
        "@media (max-width: 767px)": {
            fontSize: "15px",
            lineHeight: "22px",
        }
    },
    firstImage: {
        width: "720px",
        height: "662px",
        "@media (max-width: 1278px)": {
            width: "652px",
            height: "598px",
        },
        "@media (max-width: 767px)": {
            width: "320px",
            height: "292px",
        }
    },
    secondImage: {
        width: "672px",
        height: "680px",
        "@media (max-width: 1278px)": {
            width: "652px",
            height: "660px",
        },
        "@media (max-width: 767px)": {
            width: "320px",
            height: "324px",
        }
    },
    thirdImage: {
        width: "678px",
        height: "850px",
        "@media (max-width: 1278px)": {
            width: "650px",
            height: "816px",
        },
        "@media (max-width: 767px)": {
            width: "320px",
            height: "402px",
        }
    },
    forthImage: {
        width: "718px",
        height: "1048px",
        "@media (max-width: 1278px)": {
            width: "652px",
            height: "950px",
        },
        "@media (max-width: 767px)": {
            width: "320px",
            height: "466px",
        }
    },
    firstSwitch: {
        display: "none",
        "@media (max-width: 1278px)": {
            display: "inherit",
        },
    },
    secondSwitch: {
        display: "inherit",
        "@media (max-width: 1278px)": {
            display: "none",
        },
    }
}

export default HomeContentsStyles;