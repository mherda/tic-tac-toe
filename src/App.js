import React from 'react';

import Header from './components/Header/Header.component';
import Board from './components/Board/Board.component';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Board />
    </div>
  );
}

export default App;
