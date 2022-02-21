import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReminderProvider } from '../hooks/reminder';
import { ModalProvider } from '../hooks/modal';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReminderProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </ReminderProvider>
  );
}

export default MyApp;
