import DiceGame from 'containers/dice-game';
import LanguageSwitcher from 'components/language-switcher';
import { Suspense } from 'react';
import './App.css';

function App() {
  return (
    <Suspense fallback="Loading translation...">
      <div data-testid="App" className="App">
        <LanguageSwitcher />
        <DiceGame />
      </div>
    </Suspense>
  );
}

export default App;
