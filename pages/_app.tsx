import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReminderProvider } from '../hooks/reminder';
import { MapProvider } from '../hooks/map';
import { ModalProvider } from '../hooks/modal';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MapProvider>
      <ReminderProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </ReminderProvider>
    </MapProvider>
  );
}

export default MyApp;
