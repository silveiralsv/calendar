/* eslint-disable react/jsx-key */

import { DESTRUCTION } from 'dns';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { geoApi, weatherApi } from '../services/api';

export type LatLongObject = {
  lat: number;
  lng: number;
};
type ForecastObject = {
  main: string;
  description: string;
  icon: string;
};

type ReturnObject = {
  city: string;
  foreCast: ForecastObject;
  temperature: number;
  date: Date;
  position: LatLongObject;
};

type MapContextData = {
  position: LatLongObject;
  city: string;
  date: Date;
  foreCast: ForecastObject;
  temperature: number;
  // eslint-disable-next-line no-unused-vars
  changePosition: (latLng: LatLongObject) => void;
  // eslint-disable-next-line no-unused-vars
  getMapInfo: () => ReturnObject;
  // eslint-disable-next-line no-unused-vars
  changeDate: (date: Date) => void;
  // eslint-disable-next-line no-unused-vars
  getWeatherForecast: () => void;
};

const MapContext = createContext<MapContextData>({} as MapContextData);

export const MapProvider: React.FC = ({ children }) => {
  const [position, setPosition] = useState<LatLongObject>({
    lat: 0,
    lng: 0,
  });
  const [city, setCity] = useState<string>('');
  const [foreCast, setForecast] = useState<ForecastObject>({
    main: 'Unknown',
    description: '',
    icon: '',
  });
  const [temperature, setTemperature] = useState<number>(0);
  const [date, setDate] = useState(new Date());

  const getMapInfo = useCallback(() => {
    return {
      city,
      foreCast,
      temperature,
      date,
      position,
    };
  }, [city, foreCast, temperature, date, position]);

  const changePosition = useCallback((latlng: LatLongObject) => {
    setPosition(latlng);
  }, []);

  const getWeatherForecast = useCallback(
    async (cityName: string) => {
      try {
        const { data, status } = await weatherApi.get('onecall', {
          params: {
            lat: position.lat,
            lon: position.lng,
            exclude: 'minutely,hourly',
            appid: '6482b9251ae8db457c4cb602b8dd6c7a',
          },
        });

        if (status === 200) {
          const dayForecast =
            (data?.daily.find(
              (i: {
                dt: number;
                temp: { day: number };
                weather: Array<{ main: string; description: string; icon: string }>;
              }) => {
                const forecastDate = new Date(i.dt * 1000);

                if (
                  forecastDate?.getDate() === date.getDate() &&
                  forecastDate?.getMonth() === date.getMonth() &&
                  forecastDate?.getFullYear() === date.getFullYear()
                ) {
                  setTemperature(Math.ceil(i.temp.day / 10));
                  return true;
                }
                return false;
              }
            )?.weather?.[0] as ForecastObject) || null;

          return (
            dayForecast || {
              main: 'Unknown',
              icon: '',
              description: '',
            }
          );
        }
      } catch (error) {
        console.error('Error getting position');
      }
    },
    [position]
  );

  const getReverseGeolocation = useCallback(async () => {
    const { status, data } = await geoApi.get('reverse', {
      params: {
        lat: position.lat,
        lon: position.lng,
        appid: '6482b9251ae8db457c4cb602b8dd6c7a',
      },
    });

    if (status === 200) {
      setCity(data?.[0]?.name || '');
    }
  }, [position]);

  const changeDate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  useEffect(() => {
    getWeatherForecast();
    getReverseGeolocation();
  }, [position]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setPosition({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });
  }, []);

  return (
    <MapContext.Provider
      value={{
        position,
        city,
        temperature,
        date,
        getMapInfo,
        foreCast,
        changeDate,
        changePosition,
        getWeatherForecast,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export function useMapHook(): MapContextData {
  const context = useContext(MapContext);

  if (!context) throw new Error('useMap must be used within a MapProvider');

  return context;
}
