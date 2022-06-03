import { useEffect } from "react";

const loadGoogleMapsApiDynamically = (callback: () => void, apiKey: string) => {
  const existingScript = document.getElementById('googleMapsImportScript');

  if (existingScript) {
    return;
  }

  const googleMapImportScript = document.createElement('script');
  googleMapImportScript.id = 'googleMapsImportScript';
  googleMapImportScript.type = 'text/javascript';
  googleMapImportScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  document.head.appendChild(googleMapImportScript);

  googleMapImportScript.onload = () => {
    callback();
  };
};


function GoogleMaps({ place }: { place: string}) {
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);

  const [hasLoadedGoogleAPI, setHasLoadedGoogleAPI] = useState(
    window.google !== undefined
  );

  useEffect(() => {
    map.current?.panTo(place.geometry.location);
    map.current?.setZoom(15);
  
    marker.current?.setPosition(place.geometry.location);
  }, [place]


  loadGoogleMapsApiDynamically(() => {
    setHasLoadedGoogleAPI(true);
  }, apiKey);
  

  return <div>
  {hasLoadedGoogleAPI === false && (
    <div className={styles['loading-spinner']}>
      <div className="ds-spinner ds-spinner__m" />
    </div>
  )}</div>
}