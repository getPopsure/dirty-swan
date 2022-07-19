import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from '../style.module.scss';

const GERMANY_LAT_LNG = { lat: 51.54317, lng: 10.3181503 };

const MAP_CONFIG_OBJ = {
  zoom: 6,
  center: GERMANY_LAT_LNG,
  fullscreenControl: false,
  mapTypeControl: false,
  panControl: false,
  zoomControl: false,
  streetViewControl: false,
  scrollwheel: false,
  scaleControl: false,
  rotateControl: false,
  draggable: false,
};

export const loadGoogleMapsApiDynamically = (
  callback: () => void,
  apiKey: string
) => {
  const existingScript = document.getElementById('googleMapsImportScript');

  if (existingScript) {
    return;
  }

  const googleMapImportScript = document.createElement('script');
  googleMapImportScript.id = 'googleMapsImportScript';
  googleMapImportScript.type = 'text/javascript';
  // googleMapImportScript.async = true;
  // googleMapImportScript.defer = true;
  googleMapImportScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  document.head.appendChild(googleMapImportScript);

  googleMapImportScript.onload = () => {
    callback();
  };
};

export function GoogleMapsWrapper({
  geometry,
  hasLoadedGoogleAPI,
}: {
  geometry: google.maps.places.PlaceGeometry | undefined;
  hasLoadedGoogleAPI: boolean;
}) {
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (geometry?.location) {
      map.current?.panTo(geometry.location);
      map.current?.setZoom(15);
      marker.current?.setPosition(geometry.location);
    }
  }, [geometry]);

  useEffect(() => {
    if (hasLoadedGoogleAPI === false) {
      return;
    }

    map.current = new google.maps.Map(
      document.getElementById('map')!,
      MAP_CONFIG_OBJ
    );

    import('./mapStyle').then(({ style }) => {
      map.current?.mapTypes.set('styled_map', style);
      map.current?.setMapTypeId('styled_map');
    });

    marker.current = new google.maps.Marker({
      map: map.current,
    });
  }, [hasLoadedGoogleAPI]);

  return (
    <div
      className={classNames(`wmx8 bg-grey-500 ${styles['map-container']}`, {
        [styles['map-container--hidden']]: geometry === undefined,
      })}
    >
      <div className={styles.map} id="map" />
    </div>
  );
}
