import type { Metadata } from 'next';
import './ui/App.css';
import { outfit } from './ui/fonts';

import Providers from './providers';

export const metadata: Metadata = {
  title: 'My React App',
  description: 'My App is a RS School project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
        <Providers>
          <div id="root">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
