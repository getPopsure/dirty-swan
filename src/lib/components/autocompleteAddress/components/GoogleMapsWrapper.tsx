import { useEffect, useRef, memo } from 'react';
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

interface IGoogleMapsWrapper {
  mapId: string;
  markerLocation: google.maps.LatLng | undefined;
  isLoading: boolean;
}

const GoogleMapsWrapperComponent = ({
  mapId,
  markerLocation,
  isLoading,
}: IGoogleMapsWrapper) => {
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);

  useEffect(() => {

    map.current = new google.maps.Map(
      document.getElementById(mapId)!,
      MAP_CONFIG_OBJ
    );

    import('../util/mapStyle').then(({ style }) => {
      map.current?.mapTypes.set('styled_map', style);
      map.current?.setMapTypeId('styled_map');
    });

    marker.current = new google.maps.Marker({
      map: map.current,
    });
  }, [mapId]);

  useEffect(() => {
    if (markerLocation) {
      map.current?.panTo(markerLocation);
      map.current?.setZoom(15);
      marker.current?.setPosition(markerLocation);
    }
  }, [markerLocation]);

  if (document.querySelectorAll(`[id='${mapId}']`).length > 1) {
    throw Error(`This MapId is already in use: ${mapId}`)
  }

  return (
    <div
      className={classNames(`wmx8 bg-grey-500 ${styles['map-container']}`, {
        [styles['map-container--hidden']]: markerLocation === undefined,
      })}
    >
      <div className={styles.map} id={mapId} />
      {isLoading && (
          <div className={styles['loading-spinner']}>
            <div className="ds-spinner ds-spinner__m" />
          </div>
        )}
    </div>
  );
}


function areEqual(prevProps: Readonly<any>, nextProps: Readonly<any>) {
 if (prevProps.isLoading === nextProps.isLoading && prevProps.markerLocation?.equals(nextProps.markerLocation)) {
  return true
 } else {
  return false
 }
}

export const GoogleMapsWrapper = memo(GoogleMapsWrapperComponent, areEqual)