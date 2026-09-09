import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Marcelina Juńska · Arcysia Marketing',
  description: 'Posty, rolki i historie marek. Zobacz portfolio Marceliny Juńskiej — Arcysia Marketing.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl"><body>{children}</body></html>;
}
