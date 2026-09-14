import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Arcysia Marketing · Marcelina Juńska',
  description: 'Strategia, identyfikacja wizualna, social media, rolki i grafiki. Poznaj ofertę i portfolio Marceliny Juńskiej — Arcysia Marketing.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl"><body>{children}</body></html>;
}
