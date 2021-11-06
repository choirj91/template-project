
const HomeButtonStyles = {
    /* top Button Styles */
    topButtonContainer: {
        width: "160px",
        height: "48px",
        borderRadius: '8px',
        border: '1px solid #fff',
        "@media (max-width: 1278px)": {
            width: 200,
            height: 56,
        },
        "@media (max-width: 767px)": {
            width: 136,
            height: 38,
        }
    },
    topGooglePadding: {
        padding: "11px 21px 11px 20px",
        "@media (max-width: 1278px)": {
            padding: "13px 24px 13px 24px",
        },
        "@media (max-width: 767px)": {
            padding: "5px 13px 5px 12px",
        }
    },
    topAppStorePadding: {
        padding: "9px 25px 11px 26px",
        marginLeft: "24px",
        "@media (max-width: 1278px)": {
            marginLeft: "28px",
            padding: "13px 31px 13px 32px",
        },
        "@media (max-width: 767px)": {
            marginLeft: "12px",
            padding: "7px 21px 7px 21px",
        }
    },
    /* bottom Button Styles */
    bottomButtonContainer: {
        width: "160px",
        height: "48px",
        borderRadius: '8px',
        border: '1px solid #fff',
        backgroundColor: '#FDFDFD',
        "@media (max-width: 1278px)": {
            width: "160px",
            height: "48px",
        },
        "@media (max-width: 767px)": {
            width: "144px",
            height: "38px",
        }
    },
    bottomGooglePadding: {
        padding: "11px 21px 11px 20px",
        "@media (max-width: 1278px)": {
            padding: "13px 24px 13px 24px",
        },
        "@media (max-width: 767px)": {
            padding: "5px 13px 5px 12px",
            marginRight: "12px"
        }
    },
    bottomAppStorePadding: {
        padding: "9px 25px 11px 26px",
        marginTop: "10px",
        "@media (max-width: 1278px)": {
            padding: "13px 31px 13px 32px",
            marginTop: "12px",
        },
        "@media (max-width: 767px)": {
            padding: "7px 21px 7px 21px",
            marginTop: 0,
        }
    },
    buttonEffect: {
        cursor: "pointer",
        "&:hover": {
            boxShadow: "0 0px 1px rgba(0,0,0,0.25), 0 2px 24px rgba(0,0,0,0.22);",
        },
    }
}

export default HomeButtonStyles;