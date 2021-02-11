import { images, useRollDices, ImageName } from './utils';
import './App.css';

function App() {
  const { names, rolling, needToShowResult, handleRoll } = useRollDices();

  return (
    <div data-testid="App" className="App">
      <div className="side-section left-side">Happy new year 2021</div>
      <div className="side-section right-side">Happy new year 2021</div>
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
        {Object.entries(images).map(([name, src]) => (
          <div key={name} className={'game-item'}>
            <div
              className={`content ${
                needToShowResult && names.includes(name as ImageName)
                  ? 'matched'
                  : ''
              }`}
            >
              <img width={108} height="auto" src={src} alt={name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
