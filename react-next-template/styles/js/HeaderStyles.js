import { mainRaised } from './GlobalStyles';

const HeaderStyles = {
    mainRaised,
    headerContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "24px"
    },
    headerLeftLogo: {
        width: "52px",
        height: "52px",
        "@media (max-width: 767px)": {
            width: "36px",
            height: "36px",
        }
    },
    headerRightButton: {
        width: "52px",
        height: "52px",
        "@media (max-width: 767px)": {
            width: "36px",
            height: "36px",
        }
    }
}

export default HeaderStyles;