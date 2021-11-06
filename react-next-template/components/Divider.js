import React from 'react';
import styled from 'styled-components';

const CustomDivider = styled.hr`
background-color: ${props => props.color};
height: ${props => props.height};
margin: 1em 10em;
display: block;
unicode-bidi: isolate;
margin-block-start: 1em;
margin-block-end: 1em;
margin-inline-start: auto;
margin-inline-end: auto;
overflow: hidden;
border: none;
`;
const Divider = ({ color = "#E5E5E5", height = "1px", width = "80%", ...other }) => {

    return <CustomDivider color={color} height={height} width={width} {...other} />
}

export default Divider;