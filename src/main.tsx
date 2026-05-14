import * as ReactDOM from 'react-dom/client';
import './index.css';
import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import About from './routes/aboutpage';
import Layout from './Layout';
import CharacterDetails from './routes/CharacterDetails';
import NotFound from './routes/Notfound';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Layout />
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
