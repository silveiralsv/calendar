/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import moment from 'moment';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  FaCloud,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaCloudSun,
  FaCloudSunRain,
  FaQuestionCircle,
  FaSnowflake,
  FaSun,
} from 'react-icons/fa';
import { v4 as uuid } from 'uuid';
import { ForecastConditions } from '../components/Map/forecast';
import { geoApi, weatherApi } from '../services/api';
import { useReminder } from './reminder';

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
  visible: boolean;
  date: Date;
  reminderId: string;
  forecast: ForecastObject;
  handleSubmitForm: () => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: FormType;
  renderForecast: () => React.ReactElement;
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

  // const renderForecast = useCallback(() => {
  //   const result: ForecastConditions = {
  //     Thunderstorm: <FaCloudShowersHeavy className="w-5 h-5 fill-gray-500" />,
  //     Drizzle: <FaCloudSunRain className="w-5 h-5 fill-sky-500" />,
  //     Rain: <FaCloudRain className="w-5 h-5 fill-blue-500" />,
  //     Snow: <FaSnowflake className="w-5 h-5 fill-sky-400" />,
  //     Mist: <FaCloudSun className="w-5 h-5 fill-gray-400" />,
  //     Clear: <FaSun className="w-5 h-5 fill-yellow-500" />,
  //     Clouds: <FaCloud className="w-5 h-5 fill-gray-500" />,
  //     Unknown: <FaQuestionCircle className="w-5 h-5 fill-yellow-500" />,
  //   };

  //   return (
  //     <div className="flex gap-x-4 items-center">
  //       <span>Forecast: </span>
  //       {forecast.main !== 'Unknown' && (
  //         <span className="flex items-center gap-x-1">
  //           {result[forecast.main]}
  //           {forecast.temperature && <span className="text-sm">{`(${forecast.temperature})`}°C</span>}
  //         </span>
  //       )}
  //     </div>
  //   );
  // }, [forecast]);

  return (
    <ModalContext.Provider
      value={{
        dismissModal,
        visible,
        reminderId,
        date,
        showModal,
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
