import React, { useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import cross from '../assets/cross.svg';
import circle from '../assets/circle.svg';
import Icon from '../components/Icon';
import LinkNavigator from '../components/LinkNavigator';
import { Context } from '../context/Context';

export default function StartScreen() {
    const {dispatch, players, isRestart, winner} = useContext(Context);
    const [firstPlayerName, setFirstPlayerName] = useState('');
    const [secondPlayerName, setSecondPlayerName] = useState('')
    
    function toggleBetweenGameType() {
        if(players.every(item => item.name.length === 0) || players.every(item => item.name.length > 0)) {
            // Human vs Human
            dispatch({type: 'update-game-type', payload: 0});
        } else {
            // Human vs AI/Computer
            dispatch({type: 'update-game-type', payload: 1});
        }
    }

    useEffect(() => {
        if(winner) {
            dispatch({type: 'update-end-game', payload: 'won'});
            dispatch({type: 'increment-player-score', payload: winner.mark === 'O' ? 0 : winner.mark === 'X' ? 1 : 0});
        }
    }, [winner])
    
    
    useEffect(() => {
        dispatch({type: 'update-tic-tac-grid', payload: ['', '', '', '', '', '', '', '', '']});
        dispatch({type: 'update-end-game', payload: ''});
    }, []);

    function reboot() {
        dispatch({type: 'reset-players'});
        dispatch({type: 'toogle-restart', payload: false})
    }

    useEffect(() => {
        toggleBetweenGameType()
    }, [firstPlayerName, secondPlayerName])
    return (
        <Container>
            <Form>
                <InputContainer>
                    <Icon icon={circle}/>
                    {isRestart && 
                    <Score>{players[0].score}-</Score>
                    }
                    <InputStyled value={players[0].name} onChange={(e) => {
                        setFirstPlayerName(e.target.value)
                        let capitalizedName = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
                        dispatch({type: 'update-first-player-name', payload: capitalizedName});
                    }} autoComplete="off" type="text" name="username" placeholder="leave empty to use AI or enter player name"/>
                    
                </InputContainer>
                <InputContainer>
                    <Icon icon={cross}/>
                    {isRestart && 
                    <Score>{players[1].score}-</Score>
                    }
                    <InputStyled value={players[1].name} onChange={(e) => {
                        setSecondPlayerName(e.target.value)
                        let capitalizedName = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
                        dispatch({type: 'update-second-player-name', payload: capitalizedName});
                    }} autoComplete="off" type="text" name="username" placeholder="leave empty to use AI or enter player name"/>
                </InputContainer>
            </Form>
            <Buttons>
                <LinkNavigator url="/playground" label={isRestart ? "Play again" : "Start"}/>
                {isRestart && <LinkNavigator onClick={reboot} url="/" label="Reboot"/>}
            </Buttons>
        </Container>
    )
}

const Container = styled.div`
   
`;

const Form = styled.form`
    display: flex;
    width: 90%;
    margin: auto;
    flex-direction: column;
    row-gap: 24px;
`;


const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const InputStyled = styled.input`
    border: none;
    width: 100%;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    outline: none;
    color: #000000;
    &::-webkit-input-placeholder {
    color: #8B8585;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Score = styled.span`
    width: fit-content;
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    color: #000000;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
`;