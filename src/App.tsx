import { images, useRollDices } from './utils';
import './App.css';

function App() {
  const { names, rolling, handleRoll } = useRollDices();

  return (
    <div data-testid="App" className="App">
      <div className="game-plate">
        {names.map((name, index) => (
          <div key={`${name}-${index}`} className="plate-item">
            <div className="content">
              <img
                width={54}
                height="auto"
                src={images[name]}
                alt={`rolled-${name}`}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className={`roll-button`}
          disabled={rolling}
          onClick={handleRoll}
        >
          Roll
        </button>
      </div>
      <div className="game-grid">
        {Object.entries(images).map(([name, src]) => (
          <div key={name} className={'game-item'}>
            <div className="content">
              <img width={108} height="auto" src={src} alt={name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
