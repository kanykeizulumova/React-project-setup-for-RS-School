import * as ReactDOM from 'react-dom/client';
import './index.css';
import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import About from './routes/aboutpage';
import Layout from './Layout';
import CharacterDetails from './routes/CharacterDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    errorElement: (
      <ErrorBoundary>
        <div>Route Error</div>
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: 'character/:id',
            element: <CharacterDetails />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
