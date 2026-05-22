import * as ReactDOM from 'react-dom/client';
import './index.css';
import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import About from './routes/aboutpage';
import Layout from './Layout';
import CharacterDetails from './routes/CharacterDetails';
import NotFound from './routes/Notfound';
import { ThemeProvider } from './ThemeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <ThemeProvider>
          <Layout />
        </ThemeProvider>
      </ErrorBoundary>
    ),

    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            index: true,
            element: <CharacterDetails />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
