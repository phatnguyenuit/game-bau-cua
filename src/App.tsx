import { useCallback, useMemo, useState, useEffect } from 'react';
import './App.css';

const imageNames = [
  'deer',
  'calabash',
  'rooster',
  'fish',
  'crab',
  'shrimp',
] as const;

type ImageName = typeof imageNames[number];

const images = imageNames.reduce(
  (prev, name) => ({ ...prev, [name]: `/images/${name}.svg` }),
  {},
) as Record<ImageName, string>;

function App() {
  const [randomName, setRandomName] = useState<ImageName>();
  const [intervalId, setIntervalId] = useState<number>();
  const randomSrc = useMemo(
    () => (randomName ? images[randomName] : undefined),
    [randomName],
  );
  const cleanup = useCallback(
    (id?: number) => () => {
      window.clearInterval(id);
    },
    [],
  );

  const effect = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const id = window.setInterval(() => {
        const randomIndex = Math.floor(Math.random() * imageNames.length);
        setRandomName(imageNames[randomIndex]);
      }, 10);
      setIntervalId(id);
      setTimeout(cleanup(id), 3000);
    },
    [cleanup],
  );

  useEffect(() => {
    return cleanup(intervalId);
  }, [cleanup, intervalId]);

  return (
    <div data-testid="App" className="App">
      <h1>Game bầu cua</h1>
      <button onClick={effect}>Roll</button>
      <div className="plate game-grid">
        <div className="game-item">
          <img width={12 * 9} height="auto" src={randomSrc} alt={randomName} />
        </div>
        <div className="game-item">item2</div>
        <div className="game-item">item3</div>
      </div>
      <div className="game-grid">
        {Object.entries(images).map(([name, src]) => (
          <div key={name} className={'game-item'}>
            <img width={12 * 9} height="auto" src={src} alt={name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
