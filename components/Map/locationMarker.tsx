import React, { useEffect } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import { divIcon } from 'leaflet';

import { useMapHook } from '../../hooks/map';

const LocationMarker: React.FC = () => {
  const { position, changePosition } = useMapHook();
  const map = useMapEvents({
    click(e) {
      map.flyTo(e.latlng, map.getZoom());
      changePosition(e.latlng);
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
      changePosition(e.latlng);
    },
  });

  useEffect(() => {}, []);

  return position === null ? null : (
    <Marker
      position={position}
      icon={divIcon({
        className:
          'w-[0px] h-[0px]  border-x-[10px] border-x-transparent border-t-[20px] border-t-red-500 border-t-solid ',
      })}
    />
  );
};

export default LocationMarker;
