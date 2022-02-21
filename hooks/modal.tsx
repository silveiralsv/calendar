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
