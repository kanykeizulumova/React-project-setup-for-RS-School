import React from 'react';
import '../App.css';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h1>Oops, something went wrong! 😭</h1>
          <p>Please try refreshing the page</p>
          <button type="button" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
