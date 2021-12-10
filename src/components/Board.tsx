import React from 'react';
import styled from 'styled-components';
import board from '../assets/board.png';
import cross from '../assets/cross.svg';
import circle from '../assets/circle.svg';
import Icon from './Icon'

interface BoardProps {
    ticTacBoard: string[]
    handleClick: (index: number) => void,
}

const Board: React.FC<BoardProps>  = ({ticTacBoard, handleClick}) => {
    return (
        <BoardStyled>
            {ticTacBoard.map((item, index) => 
                <BoxField key={index} onClick={() => handleClick(index)}>
                    {item === 'X' ?
                    <Icon icon={cross}/>
                    : item === 'O' ?
                    <Icon icon={circle}/>
                    : ''
                }
                </BoxField>
            )}
        </BoardStyled>
    )
}

const BoardStyled = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    width: 354.17px;
    height: 321px;
    margin: auto;
    background: url(${board});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;

const BoxField = styled.div`
    display: flex;
    width: 80%;
    height: 80%;
    & > img {
        margin: 0;
        display: flex;
        align-self: center;
        position: relative;
        bottom: 5px;
        left: 10px;
    }
    cursor: pointer;
`;

export default Board;