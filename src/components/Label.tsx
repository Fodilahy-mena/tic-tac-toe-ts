import React from 'react';
import styled from 'styled-components';
interface LabelProps {
    text: string | number
}
const Label: React.FC<LabelProps>  = ({text}) => {
    return (
        <LabelStyled data-cy="game-satatus">{text}</LabelStyled>
    )
}

const LabelStyled = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 28px;
    text-align: center;
    color: #000000;
`;

export default Label;