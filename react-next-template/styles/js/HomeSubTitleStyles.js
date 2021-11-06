const HomeSubTitleStyles = {
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
            height: "230px",
            marginTop: "-85px",
        }
    },
    rectangle: {
        backgroundColor: "#343434",
        width: "5vw",
        height: "8px",
        "@media (max-width: 1278px)": {
            width: "8vw",
        },
        "@media (max-width: 767px)": {
            width: "40px",
            height: "6px"
        }
    },
    subTitleDiv: {
        marginTop: 44,
        "@media (max-width: 767px)": {
            marginTop: 28,
        }
    },
    subTitleStyle: {
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        textAlign: "center",
        fontSize: "26px",
        lineHeight: "38px",
        "@media (max-width: 1278px)": {
            fontSize: "2vw",
            lineHeight: "3vw",
        },
        "@media (max-width: 767px)": {
            fontSize: "16px",
            lineHeight: "23px",
        }
    },
    subTopFont: {
        fontWeight: "400",
        color: '#828282'
    },
    subBottomFont: {
        fontWeight: "700",
        color: '#1D1D1D'
    }
}

export default HomeSubTitleStyles;