'use client';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../App'), { ssr: false });

function ClientOnly() {
  return <App />;
}

export default ClientOnly;
