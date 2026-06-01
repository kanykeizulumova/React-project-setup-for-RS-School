import * as ReactDOM from 'react-dom/client';
import './index.css';
import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import About from './routes/aboutpage';
import Layout from './Layout';
import NotFound from './routes/Notfound';
import { ThemeProvider } from './ThemeContext';

const router = createBrowserRouter(
  [
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
          children: [],
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
  ],
  {
    basename: import.meta.env.DEV ? '/' : '/React-project-setup-for-RS-School',
  }
);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
