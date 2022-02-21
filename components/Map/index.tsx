/* eslint-disable no-unused-vars */
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMapHook } from '../../hooks/map';
import { ForecastConditions, renderForecast } from './forecast';

import LocationMarker from './locationMarker';

const Map: React.FC = () => {
  const { position, city, foreCast, temperature } = useMapHook();

  return (
    <>
      {city && (
        <div className="flex flex-col">
          <span>City: {city}</span>
          {renderForecast(foreCast.main as keyof ForecastConditions, temperature)}
        </div>
      )}
      <MapContainer zoom={13} center={position} style={{ height: 400, width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
    </>
  );
};

export default Map;
