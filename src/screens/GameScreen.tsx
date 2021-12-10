import React, {useEffect, useContext} from 'react';
import Board from '../components/Board';
import Label from '../components/Label';
import LinkNavigator from '../components/LinkNavigator';
import { Context } from '../context/Context';

export default function GameScreen() {
  const {dispatch, winner, ticTacGrid, nextPlayer, fillSquare, endGame, handleClick} = useContext(Context);
  
  useEffect(() => {
    dispatch({type: 'update-winner', payload: null})
  }, [])

  // check draw
  const isDraw = ticTacGrid.every((item: string) => {
    return item.length === 1;
  });

  useEffect(() => {
    if(isDraw) {
      dispatch({type: 'increment-player-score', payload: 0});
      dispatch({type: 'increment-player-score', payload: 1});
  }
  if(isDraw && winner === null) {
    dispatch({type: 'update-end-game', payload: 'draw'});
  }
  }, [fillSquare])

  return (
      <div>
          {winner ? <Label text={`${winner.name ? winner.name : winner.mark} won!`}/>
          : 
          <Label text={`${endGame === '' ? (`${nextPlayer.name ? nextPlayer.name : nextPlayer.mark}'s turn`) : endGame === "draw" ? 'Draw!' : ''}`}/>}
          <Board ticTacBoard={ticTacGrid} handleClick={handleClick}/>
          {isDraw || winner ?
          <LinkNavigator label="Restart" url="/"/> : ""}
      </div>
  );
}