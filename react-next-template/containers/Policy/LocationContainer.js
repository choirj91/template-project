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
                {"위치기반서비스 이용약관"}
            </Title>
            <br/>
            <Title>
                {"제1조 (목적)"}
            </Title>
            <Content>
                {"내용"}<br/>
            </Content>
            <br />
            <Title>
                {"제2조 (약관의 효력 및 변경)"}
            </Title>
            <Content>
                {"내용"}<br/>
            </Content>
        </div>
    );
}

export default PrivacyContainer;