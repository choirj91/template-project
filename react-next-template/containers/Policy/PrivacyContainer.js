import React from 'react';
import styled from 'styled-components';

const Title = styled.b`
display: block;
margin-bottom: 5px;
padding-left: 10px;
`;

const Content = styled.div`
padding-left: 10px;
`;

const ContentTab = styled.div`
padding-left: 25px;
`;

const PrivacyContainer = () => {


    return (
        <div style={{ padding: 10 }}>
            <Title>
                {"개인정보처리방침"}
            </Title>
            <br />
            <Title>
                {"제1조(개인정보의 처리 목적)"}
            </Title>
            <Content>
                {"내용"}<br />
                <ContentTab>
                    {"1. 내용"}<br />
                </ContentTab>
            </Content>
            <br />
            <Title>제2조(개인정보의 처리 및 보유 기간)</Title>
            <Content>
                {"내용"}<br />
                {"② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다."}<br />
                <ContentTab>
                    {"1. 내용"}<br />
                </ContentTab>
            </Content>
        </div>
    );
}

export default PrivacyContainer;