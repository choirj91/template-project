import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

// import components
import Divider from '../Divider';
import Link from '../Link';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: center;
    width: auto;
    flex-direction: column;
    align-items: center;
`;

const styles = makeStyles({
    linkStyle: {
        padding: "1.5em",
        fontSize: "0.8em",
        "@media (max-width: 400px)": {
            padding: "1em",
            fontSize: "0.5em",
        },
        "@media (max-width: 600px)": {
            padding: "1em",
            fontSize: "0.65em",
        }
    }
});

const Footer = () => {
    const classes = styles();

    return (
        <footer>
            <Container style={{ padding: "20px" }}>
                <div style={{ textAlign: "center"}}>
                    <Link href="https://www.notion.so/4beb328f314a4da4b1c7dedcc9eed817" className={classes.linkStyle}>
                        <span>샘플프로젝트</span>
                    </Link>
                    <Link href="/policy/service" className={classes.linkStyle}>
                        <span>이용약관</span>
                    </Link>
                    <Link href="/policy/location" className={classes.linkStyle}>
                        <span>위치기반서비스 이용약관</span>
                    </Link>
                    <Link href="/policy/privacy" className={classes.linkStyle}>
                        <span>개인보호처리방침</span>
                    </Link>
                </div>
                <Divider />
                <div style={{
                    color: "#000",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <span style={{ fontSize: "0.875rem", color: "#8e8686", }} align="center">
                        {'Copyright © company ' + new Date().getFullYear() + '. All Rights Reserved.'}
                    </span>
                </div>
                <div style={{
                    color: "#fff",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px"
                }}>
                    <Link href="/">
                        <Image
                            alt="logo"
                            src="/static/images/footer_logo.png"
                            width={914/6}
                            height={127/6}
                        />
                    </Link>
                </div>
            </Container>
        </footer>
    );
};


export default Footer;