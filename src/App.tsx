import { useState } from 'react';
import { Link, Outlet } from 'react-router';
import './App.css';
import { useTheme } from './ThemeContext';

const App = () => {
  const [shouldThrow, setShouldThrow] = useState(false);
  const { theme, toggleTheme } = useTheme();

  if (shouldThrow) {
    throw new Error('Simulated crash');
  }

  return (
    <div>
      <div className={`app-container ${theme}`}>
        <header className="search-area">
          <div className="forms">
            <button type="button" className="uncontrolled">
              Open form (Uncontrolled)
            </button>
            <button type="button" className="rhf-btn">
              Open form (React Hook Form)
            </button>
          </div>
          <div className="theme-context">
            <button type="button" className="switch-btn" onClick={toggleTheme}>
              Switch Theme
            </button>
          </div>
        </header>

        <main className="result-area">
          <div className="details-side">
            <Outlet />
          </div>
        </main>

        <button
          type="button"
          className="crash-button"
          onClick={() => setShouldThrow(true)}
        >
          Simulate Crash
        </button>
        <footer>
          <button type="button" className="about-us">
            <Link to="/about">About Us</Link>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default App;
