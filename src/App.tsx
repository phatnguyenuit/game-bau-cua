import { images, useRollDices, ImageName } from './utils';
import './App.css';

function App() {
  const {
    names,
    rolling,
    needToShowResult,
    betState,
    amount,
    handleRoll,
    handleBet,
    handleResetBet,
  } = useRollDices();

  return (
    <div data-testid="App" className="App">
      <div className="side-section left-side">Happy new year 2021</div>
      <div className="side-section right-side">Happy new year 2021</div>
      <div className="amount">
        <span>${amount}</span>
      </div>
      <div className="game-plate">
        {names.map((name, index) => (
          <div key={`${name}-${index}`} className="plate-item">
            <div className="content">
              <img
                width={64}
                height="auto"
                src={images[name]}
                alt={`rolled-${name}`}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className={`play-button`}
          disabled={rolling}
          onClick={handleRoll}
        >
          <img
            width={64}
            height="auto"
            src="/images/dice.svg"
            alt="play-icon"
          />
        </button>
      </div>
      <div className="game-grid">
        {(Object.entries(images) as Array<[ImageName, string]>).map(
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
