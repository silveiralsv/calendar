/* eslint-disable no-unsafe-optional-chaining */
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
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
import moment from 'moment';
import { SubmitBtn } from '../Buttons/submit';
import { Input } from '../Form/input';
import { SeccondaryBtn } from '../Buttons/seccondary';
import { ForecastObject, useModal } from '../../hooks/modal';
import { useReminder } from '../../hooks/reminder';
import { geoApi, weatherApi } from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

type ForecastConditions = {
  Thunderstorm: React.ReactNode;
  Drizzle: React.ReactNode;
  Rain: React.ReactNode;
  Snow: React.ReactNode;
  Mist: React.ReactNode;
  Clear: React.ReactNode;
  Clouds: React.ReactNode;
  Unknown: React.ReactNode;
};
const result: ForecastConditions = {
  Thunderstorm: <FaCloudShowersHeavy className="w-5 h-5 fill-gray-500" />,
  Drizzle: <FaCloudSunRain className="w-5 h-5 fill-sky-500" />,
  Rain: <FaCloudRain className="w-5 h-5 fill-blue-500" />,
  Snow: <FaSnowflake className="w-5 h-5 fill-sky-400" />,
  Mist: <FaCloudSun className="w-5 h-5 fill-gray-400" />,
  Clear: <FaSun className="w-5 h-5 fill-yellow-500" />,
  Clouds: <FaCloud className="w-5 h-5 fill-gray-500" />,
  Unknown: <FaQuestionCircle className="w-5 h-5 fill-yellow-500" />,
};

type ModalProps = {
  reminderId?: string;
};

type FormType = {
  date: string;
  title: string;
  description: string;
  color: string;
  city: string;
};

export const Modal: React.FC<ModalProps> = () => {
  const { visible, dismissModal, reminderId, date } = useModal();
  const { upsertReminder } = useReminder();
  const { getReminder } = useReminder();
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setError] = useState<FormType>({} as FormType);
  const [form, setForm] = useState<FormType>({
    color: '#bbbbbb',
  } as FormType);
  const [forecast, setForecast] = useState<ForecastObject>({} as ForecastObject);

  useEffect(() => {
    setForm((old) => ({
      ...old,
      date: moment(date).format('YYYY-MM-DDThh:mm'),
    }));
  }, [date]);

  useEffect(() => {
    const remind = getReminder(reminderId);
    if (remind) {
      setForm((old) => ({
        ...old,
        title: remind.title,
        city: remind.city,
        date: moment(remind.date).format('YYYY-MM-DDThh:mm'),
        description: remind.description,
        color: remind.color,
      }));

      setForecast(
        (old) =>
          ({
            ...old,
            main: remind.forecast?.main,
            description: remind.forecast?.description,
            icon: remind.forecast?.icon,
            temperature: remind.forecast?.temperature,
          } as ForecastObject)
      );
    } else {
      setForm((old) => ({
        ...old,
        title: '',
        city: '',
        date: moment(date).format('YYYY-MM-DDThh:mm'),
        description: '',
        color: '#bbbbbb',
      }));

      setForecast({
        main: 'Unknown',
        description: '',
        icon: '',
        temperature: 0,
      });
    }
  }, [reminderId, visible, getReminder]);

  const getForecast = async (cityName: string, reminderDate: Date) => {
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
          appid: '6482b9251ae8db457c4cb602b8dd6c7a',
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
            appid: '6482b9251ae8db457c4cb602b8dd6c7a',
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
        };

        foreCastResult = { ...dayForecast, temperature };
      }
    } catch (error) {
      console.log(`@@@@@ [LOG] ${new Date().toLocaleString()}  -> error`, error);
    }
    return foreCastResult;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
    setError((old) => ({
      ...old,
      [e.target.name]: '',
    }));
  };

  const handleValidate = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('Title is required').max(10, 'Title is too long(max: 10)'),
        city: Yup.string().required('City is required'),
        date: Yup.string().required('Date is required'),
        color: Yup.string().required('Color is required'),
        description: Yup.string().required('Description is required').max(30, 'Description is too long(max: 30)'),
      });

      await schema.validate(form, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        setError(errors as FormType);
      }
      return false;
    }
  }, [form]);

  const handleSubmitForm = async () => {
    const isValid = await handleValidate();
    if (!isValid) return;

    const { city, color, date: formDate, description, title } = form;

    const parsedDate = new Date(formDate);

    setIsLoading(true);
    const forecastForNewReminder = await getForecast(city, parsedDate);

    upsertReminder({
      id: reminderId,
      color,
      description,
      title,
      city,
      date: parsedDate,
      forecast: forecastForNewReminder,
    });
    dismissModal();
    setIsLoading(false);
    setForm({
      city: '',
      date: '',
      title: '',
      description: '',
      color: '#bbbbbb',
    });
  };

  return (
    <div
      className={`
        ${visible ? 'block' : 'hidden'}
        absolute inset-0 z-50  animate-blur  bg-gray-700 bg-opacity-60
      `}
    >
      <div className=" absolute w-full h-full flex items-center justify-center drop-shadow-2xl motion-safe:animate-fade-in">
        <div className="flex flex-col bg-white p-8 rounded">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleSubmitForm();
            }}
            className="gap-y-4 flex flex-col"
          >
            <Input
              value={form?.title || ''}
              onChange={handleFormChange}
              error={erro.title}
              name="title"
              type="text"
              label="Title"
              placeholder="Eg: Interview"
            />
            <Input
              onChange={handleFormChange}
              value={form.date || ''}
              name="date"
              type="datetime-local"
              label="Data"
              error={erro.date}
              placeholder="Eg: Interview"
            />
            <Input
              value={form.description || ''}
              onChange={handleFormChange}
              name="description"
              type="text"
              textBox
              error={erro.description}
              label="Description"
              placeholder="Eg: Interview with FANG"
            />
            <Input
              value={form.color || ''}
              onChange={handleFormChange}
              error={erro.color}
              name="color"
              type="color"
              label="Color"
            />
            <Input
              value={form.city || ''}
              onChange={handleFormChange}
              name="city"
              type="text"
              error={erro.city}
              label="City"
            />

            {forecast?.main !== 'Unknown' && (
              <div className="flex gap-x-4 items-center">
                <span>Forecast: </span>
                <span className="flex items-center gap-x-1">
                  {result[forecast.main]}
                  {forecast.temperature && <span className="text-sm">{`(${forecast.temperature})`}°C</span>}
                </span>
              </div>
            )}

            <div className="flex items-center justify-evenly">
              <SubmitBtn text="Create" loading={isLoading} />
              <SeccondaryBtn text="Cancel" onClick={() => dismissModal()} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
