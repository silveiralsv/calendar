/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */

import React, { createContext, useCallback, useContext,  useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ForecastConditions } from '../components/Map/forecast';
import { geoApi, weatherApi } from '../services/api';

const appid = process.env.API_KEY
export type LatLongObject = {
  lat: number;
  lng: number;
};
export type ForecastObject = {
  main: keyof ForecastConditions;
  description: string;
  icon: string;
  temperature: number;
};

type FormType = {
  date: string;
  title: string;
  description: string;
  color: string;
  city: string;
};

type ModalContextData = {
  dismissModal: () => void;
  showModal: (date: Date, id?: string) => void;
  getForecast: (cityname: string, date:Date) => Promise<ForecastObject>;
  visible: boolean;
  date: Date;
  reminderId: string;
};

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export const ModalProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [reminderId, setReminderId] = useState<string>(uuid());

  const showModal = useCallback((modalDefaultDate: Date, id = uuid()) => {
    setDate(modalDefaultDate);
    setReminderId(id);
    setVisible(true);
  }, []);

  const dismissModal = useCallback(() => {
    setVisible(false);
  }, []);

  const getForecast = useCallback(async (cityName: string, reminderDate: Date) => {
    let foreCastResult: ForecastObject = {
      main: 'Unknown',
      description: '',
      icon: '',
      temperature: 0,
    };
    try {
      const { data } = await geoApi.get('direct', {
        params: {
          q: cityName,
          appid,
        },
      });

      const { lat, lon } = data?.[0] || { lat: 0, lon: 0 };

      if (lat && lon) {
        let temperature: number = 0;
        const { data: forecastData } = await weatherApi.get('onecall', {
          params: {
            lat,
            lon,
            exclude: 'minutely,hourly',
            appid,
          },
        });

        const dayForecast = (forecastData?.daily.find(
          (i: {
            dt: number;
            temp: { day: number };
            weather: Array<{ main: string; description: string; icon: string }>;
          }) => {
            const forecastDate = new Date(i.dt * 1000);

            if (
              forecastDate?.getDate() === reminderDate.getDate() &&
              forecastDate?.getMonth() === reminderDate.getMonth() &&
              forecastDate?.getFullYear() === reminderDate.getFullYear()
            ) {
              temperature = Math.ceil(i.temp.day / 10);
              return true;
            }
            return false;
          }
        )?.weather?.[0] as ForecastObject) || {
          main: 'Unknown',
          icon: '',
          description: '',
        } ;

        foreCastResult = { ...dayForecast, temperature };
      }
    } catch (error) {}
    return foreCastResult;
  }, []);

  return (
    <ModalContext.Provider
      value={{
        dismissModal,
        visible,
        reminderId,
        date,
        showModal,
        getForecast,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  if (!context) throw new Error('useModal must be used within a ModalProvider');

  return context;
}
