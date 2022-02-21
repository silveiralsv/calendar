import L from 'leaflet';
import map from '../../public/map.svg';

const mapIcon = L.icon({
  iconUrl: map,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export default mapIcon;
