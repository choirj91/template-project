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

const ServiceContainer = () => {

    return (
        <div style={{ padding:"10px" }}>
            <Title>서비스 이용약관</Title>
            <Content>
                {"내용"}<br />
            </Content>
            <br />
            <Title>제 2조 약관의 게시와 효력, 개정</Title>
            <ContentTab>
                {"1. 내용"}<br />
            </ContentTab>
            <br />
            <Title>제 3조 약관의 해석과 예외 준칙</Title>
            <ContentTab>
                {"1. 내용"}<br />            
            </ContentTab>
        </div>
    );
}

export default ServiceContainer;