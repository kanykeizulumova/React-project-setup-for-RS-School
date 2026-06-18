'use client';

import { Suspense } from 'react';
import App from './App';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading layout...</div>}>
      <App />
    </Suspense>
  );
}
