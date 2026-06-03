import { useState } from 'react';
import { Link, Outlet } from 'react-router';
import './App.css';
import { useTheme } from './ThemeContext';
import Modal from './components/Modal';
import { FORMS } from './formsMap';
import useUserStore from './store/useUserStore';

const App = () => {
  const [shouldThrow, setShouldThrow] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const users = useUserStore((state) => state.users);
  const removeUser = useUserStore((state) => state.removeUser);

  const openModal = (formType: string) => {
    setCurrentForm(formType);
    setIsModalOpen(true);
  };

  if (shouldThrow) {
    throw new Error('Simulated crash');
  }

  return (
    <div>
      <div className={`app-container ${theme}`}>
        <header className="search-area">
          <div className="forms">
            <button
              type="button"
              className="uncontrolled"
              onClick={() => openModal(FORMS.UNCONTROLLED)}
            >
              Open form (Uncontrolled)
            </button>
            <button
              type="button"
              className="rhf-btn"
              onClick={() => openModal(FORMS.RHF)}
            >
              Open form (React Hook Form)
            </button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              activeForm={currentForm}
            />
          </div>
          <div className="theme-context">
            <button type="button" className="switch-btn" onClick={toggleTheme}>
              Switch Theme
            </button>
          </div>
        </header>

        <main className="result-area">
          <h2>List of users:</h2>

          {users.length === 0 ? (
            <p style={{ color: 'gray' }}>List is empty...</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {users.map((user) => (
                <li
                  key={user.id}
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <strong>Full Name: {user.fullName}</strong>
                    <div>Email: {user.email}</div>
                    <div>Age: {user.age}</div>
                    <div>Gender: {user.gender}</div>
                    <div>
                      I {user.terms ? 'agree ' : 'do not agree'} to the terms of
                      use and privacy
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeUser(user.id)}
                    style={{
                      background: '#ff4d4d',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete user
                  </button>
                </li>
              ))}
            </ul>
          )}
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
