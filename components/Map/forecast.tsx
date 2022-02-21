import React from 'react';

import {
  FaCloudShowersHeavy,
  FaCloudRain,
  FaCloudSunRain,
  FaSnowflake,
  FaCloudSun,
  FaSun,
  FaCloud,
  FaQuestionCircle,
} from 'react-icons/fa';

export type ForecastConditions = {
  Thunderstorm: React.ReactNode;
  Drizzle: React.ReactNode;
  Rain: React.ReactNode;
  Snow: React.ReactNode;
  Mist: React.ReactNode;
  Clear: React.ReactNode;
  Clouds: React.ReactNode;
  Unknown: React.ReactNode;
};

export const renderForecast = (code: keyof ForecastConditions, temperature: number) => {
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

  return (
    <div className="flex gap-x-4 items-center">
      <span>Forecast: </span>
      {code !== 'Unknown' && (
        <span className="flex items-center gap-x-1">
          {result[code]}
          <span className="text-sm">{`(${temperature})`}°C</span>
        </span>
      )}
    </div>
  );
};
