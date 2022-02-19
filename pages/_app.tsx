import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReminderProvider } from '../hooks/reminder';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReminderProvider>
      <Component {...pageProps} />
    </ReminderProvider>
  );
}

export default MyApp;
