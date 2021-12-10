import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Heading>Tic tac toe</Heading>
      </header>
      <Main>
        <Router>
          <Switch>
            <Route exact path="/">
                <StartScreen/>
              </Route>
              <Route path="/playground">
                <GameScreen/>
              </Route>
          </Switch>
        </Router>
      </Main>
    </div>
  );
}

const Main = styled.main`
  max-width: 847px;
  margin: auto;
  width: 100%;
`;

const Heading = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 52px;
  line-height: 52px;
  color: #000000;
`;

export default App;