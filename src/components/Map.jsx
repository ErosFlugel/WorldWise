//Tools
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';

//Contexts
import { useCities } from '../contexts/CitiesContexts';

//Hooks
import { useGeolocation } from '../hooks/useGeolocation.js';
import { useUrlPosition } from '../hooks/useUrlPosition.js';

//Modules
import flagEmojiToPNG from '../Modules/flagEmojiToPNG';

//Styles
import styles from './Map.module.css';
import Button from './Button';

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([10, 0]);
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div
      className={styles.mapContainer}
      // onClick={() => navigate('form')}
    >
      {!geolocationPosition && (
        <Button
          type='position'
          onClick={getPosition}
        >
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id + '22'}
          >
            {/* We setted the css properties of the popup in the Map.module.css file, since Leaflet sets css classes to the react elements we can take those and customize them within our CSS file using :global attributes*/}
            <Popup>
              <span>{flagEmojiToPNG(city.emoji)}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  //From Leaflet to select the current map and use it later
  const map = useMap();

  //From leaflet to set a different position on the map
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  //From leaflet to handle click or other events on the map
  useMapEvents({
    click: (e) => {
      return navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

ChangeCenter.propTypes = {
  position: PropTypes.array,
};

export default Map;
