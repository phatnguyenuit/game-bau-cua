import NewGameButton from './components/new-game-button';
import DicePlate from './components/dice-plate';
import DiceGrid from './components/dice-grid';
import useDiceGame from './hooks/useDiceGame';
import { formatThousand } from './utils';

import './App.css';

function App() {
  const {
    amount,
    betState,
    names,
    needToShowResult,
    rolling,
    handleBet,
    handleResetBet,
    handleRoll,
    startNewSession,
  } = useDiceGame();

  return (
    <div data-testid="App" className="App">
      <div className="side-section left-side">Happy new year 2021</div>
      <div className="side-section right-side">Happy new year 2021</div>
      <div className="amount-section">
        <span>${formatThousand(amount)}</span>
        <NewGameButton onClick={startNewSession} />
      </div>
      <DicePlate disabled={rolling} items={names} onStart={handleRoll} />
      <DiceGrid
        betValues={betState}
        rolledDices={names}
        handleBet={handleBet}
        handleResetBet={handleResetBet}
        needToShowResult={needToShowResult}
      />
    </div>
  );
}

export default App;
