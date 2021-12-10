import {createContext, useReducer, useEffect} from 'react';
import {winningPatterns} from './utility';

type PlayerType = {
    name: string 
    mark: string
    score: number
    id: string
}

interface StateType {
    dispatch: React.Dispatch<any>;
    players:  PlayerType[];
    nextPlayer: PlayerType;
    winner: PlayerType | null;
    ticTacGrid: string[];
    isRestart: boolean;
    fillSquare: boolean;
    endGame: string;
    gameType: number;
    handleClick: (index: number) => void;
}

export const initialValues: StateType = {
    dispatch: () => {},
    players: [{name: '', mark: "O", score: 0, id: '1'}, {name: '', mark: "X", score: 0, id: '2'}],
    nextPlayer: {name: '', mark: 'X', score: 0, id: '2'},
    winner: null,
    ticTacGrid: ['', '', '', '', '', '', '', '', ''],
    isRestart: false,
    fillSquare: false,
    endGame: '',
    gameType: 0,
    handleClick: () => {},
}

type Action = 
| {type: "reset-players"} 
| {type: "update-next-player", payload: PlayerType}
| {type: "update-winner", payload: PlayerType | null}
| {type: "update-tic-tac-grid", payload: string[]}
| {type: "toogle-restart", payload: boolean} 
| {type: "increment-player-score", payload: number}
| {type: "toggle-fill-square"}
| {type: "update-game-type", payload: number}
| {type: "update-end-game", payload: string}
| {type: "update-first-player-name", payload: string}
| {type: "update-second-player-name", payload: string}

export const Context = createContext(initialValues);

function reducer(state: StateType, action: Action) {
    switch (action.type) {
        case 'reset-players': {
            return {
                ...state,
                players: [{name: '', mark: "O", score: 0, id: '1'}, {name: '', mark: "X", score: 0, id: '2'}]}
        }
        case 'update-next-player': {
            return { 
                ...state,
                nextPlayer: action.payload}
        }
        case 'update-winner': {
            return { 
                ...state,
                winner: action.payload}
        }
        case 'update-tic-tac-grid': {
            return { 
                ...state,
                ticTacGrid: action.payload,
            }
        }
        case 'toogle-restart': {
            return { 
                ...state,
                isRestart: action.payload}
        }
        case 'increment-player-score': {
            return { 
                ...state,
                players: state.players.map((player: PlayerType, index: number) => {
                    if(index === action.payload) {
                        return {...player, score: player.score + 1}
                    } else {
                        return player
                    }
                })}
        }
        case 'toggle-fill-square': {
            return { 
                ...state,
                fillSquare: !state.fillSquare}
        }
        case 'update-game-type': {
            return { 
                ...state,
                gameType: action.payload}
        }
        case 'update-end-game': {
            return { 
                ...state,
                endGame: action.payload}
        }
        case 'update-first-player-name': {
            return { 
                ...state,
                players: state.players.map((player: PlayerType, index: number) => {
                    if(index === 0) {
                        return {...player, name: action.payload}
                    } else {
                        return player
                    }
                })}
        }
        case 'update-second-player-name': {
            return { 
                ...state,
                players: state.players.map((player: PlayerType, index: number) => {
                    if(index === 1) {
                        return {...player, name: action.payload}
                    } else {
                        return player
                    }
                })}
        }
        default:
            return state;
    }
}

export const ContextProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialValues);

    function detectWinner(grid: string[]): string | null {
        for (let i = 0; i < winningPatterns.length; i++) {
            const [a, b, c] = winningPatterns[i];
            if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
            return grid[a];
        }
        }
        return null;
    }
    const winnerMark: string | null = detectWinner(state.ticTacGrid);
    const playerWon: PlayerType | undefined = state.players.find((player: {name: string, mark: string, score: number, id: string}) => player.mark === winnerMark);
    
    useEffect(() => {
        if(playerWon) {
            dispatch({type: 'update-winner', payload: playerWon});
        }
    }, [playerWon])

    function actionAfterOneMove(ticTacGridCopy: string[]) {
        dispatch({type: 'update-tic-tac-grid', payload: ticTacGridCopy});
        dispatch({type: 'toggle-fill-square'});
        dispatch({type: 'update-next-player', payload: state.nextPlayer.mark === state.players[0].mark ? state.players[1] : state.nextPlayer.mark === state.players[1].mark ? state.players[0] : state.nextPlayer});
    }
    
    function handleClick(index: number): void {
        const ticTacGridCopy = [...state.ticTacGrid];
        if (winnerMark || ticTacGridCopy[index]) return;
        // insert the player's mark (O or X) to the ticTacGridCopy item that
        // has the same index as the selected square from the board
        ticTacGridCopy[index] = state.nextPlayer.mark;
        actionAfterOneMove(ticTacGridCopy)
    };

    function makeAiMove(grid: string[], mark: string) {
        if(state.winner == null) {
        for (let i: number = 0; i < winningPatterns.length; i++) {
            const [a, b, c]: number[] = winningPatterns[i];
            
            if(grid[4].length !== 1) {
              const ticTacGridCopy: string[] = [...grid];
              if (winnerMark || ticTacGridCopy[4]) return;
              // insert the AI's mark (O or X) to the ticTacGridCopy index that
              // is preferable and empty
              ticTacGridCopy[4] = mark;
              actionAfterOneMove(ticTacGridCopy)
              
            } else if(grid[a].length !== 1 && (grid[b] !== mark)) {
              const ticTacGridCopy = [...grid];
              if (winnerMark || ticTacGridCopy[a]) return;
              // insert the AI's mark (O or X) to the ticTacGridCopy index that
              // is preferable and empty
              ticTacGridCopy[a] = mark;
              actionAfterOneMove(ticTacGridCopy)
              
            } else if(grid[b].length !== 1 && (grid[a] !== mark)) {
                
                const ticTacGridCopy = [...grid];
                if (winnerMark || ticTacGridCopy[b]) return;
                // insert the AI's mark (O or X) to the ticTacGridCopy index that
                // is preferable and empty
                ticTacGridCopy[b] = state.nextPlayer.mark;
                actionAfterOneMove(ticTacGridCopy)
            } else if(grid[c].length !== 1 && (grid[b] !== mark)) {
                const ticTacGridCopy = [...grid];
                if (winnerMark || ticTacGridCopy[c]) return;
                // insert the AI's mark (O or X) to the ticTacGridCopy index that
                // is preferable and empty
                ticTacGridCopy[c] = state.nextPlayer.mark;
                actionAfterOneMove(ticTacGridCopy)
            }
            
          }
        }
        return null;
    }
    
    useEffect(() => {
        if(state.gameType === 1) {
          makeAiMove(state.ticTacGrid, state.nextPlayer.mark);
        }
      },[state.fillSquare]);
      
      useEffect(() => {
        // random player to start
        dispatch({type: 'update-next-player', payload: state.players[Math.floor(Math.random() * state.players.length)]});
      }, []);
    
    return (
        <Context.Provider value={{
            dispatch,
            players: state.players,
            winner: state.winner,
            ticTacGrid: state.ticTacGrid,
            nextPlayer: state.nextPlayer,
            endGame: state.endGame,
            isRestart: state.isRestart,
            fillSquare: state.fillSquare,
            gameType: state.gameType,
            handleClick: (index: number) => handleClick(index),
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider



