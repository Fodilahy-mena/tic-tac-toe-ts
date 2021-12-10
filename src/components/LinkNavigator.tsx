import React from 'react';
import styled from 'styled-components';
import { Link as ReachRouterLink } from 'react-router-dom';

interface LinkProps {
    label: string,
    url: string,
    onClick?: () => void
}
const LinkNavigator: React.FC<LinkProps> = ({label, url, onClick}) => {
    return (
        <LinkStyled to={url} onClick={onClick ? onClick : () => {}}>
            {label}
        </LinkStyled>
    )
}

const LinkStyled = styled(ReachRouterLink)`
    font-size: 52px;
    font-style: normal;
    font-weight: normal;
    position: relative;
    top: 20px;
    text-decoration: none;
    text-align: center;
    color: #000000;

    @media (max-width: 768px) {
        font-size: 32px;
    }
`;

export default LinkNavigator;