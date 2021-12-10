import styled from "styled-components";
interface IconProps {
    icon: string
}
const Icon: React.FC<IconProps> = ({icon}) => {
    return (
    <IconStyled data-cy="icon" src={icon} alt="user's mark"/>
    )
}
const IconStyled = styled.img`
    width: 100%;
    max-width: 55px;
    max-height: 55px;
    margin-right: 39px; 
    @media (max-width: 768px) {
        max-width: 35px;
        max-height: 35px;
        margin-right: 16px;
    }
`;
export default Icon