import NewGameButton from './components/new-game-button';
import DicePlate from './components/dice-plate';
import useDiceGame from './hooks/useDiceGame';
import { diceImages, DiceName } from './constants';
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
      <div className="game-grid">
        {(Object.entries(diceImages) as Array<[DiceName, string]>).map(
          ([name, src]) => {
            const betted = betState[name] > 0;
            return (
              <div key={name} className={'game-item'} onClick={handleBet(name)}>
                <div
                  className={`content ${
                    needToShowResult && names.includes(name) ? 'matched' : ''
                  } ${betState[name] > 0 ? 'betted' : ''}`}
                >
                  {betted && (
                    <>
                      {!needToShowResult && (
                        <div className="corner-section">
                          <span
                            className="reset"
                            onClick={handleResetBet(name)}
                          >
                            &#x2715;
                          </span>
                        </div>
                      )}
                      <div className="bet-value">
                        <span className="bet-value">{betState[name]}</span>
                      </div>
                    </>
                  )}

                  <img width={108} height="auto" src={src} alt={name} />
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}

export default App;
