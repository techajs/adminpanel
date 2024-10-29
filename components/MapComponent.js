// "use client";
// import React, { useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const defaultCenter = {
//   lat: 34.083658,
//   lng: 74.797368,
// };

// const MapComponent = ({ latitude, longitude, dlatitude, dlongitude }) => {
//   const startLocation = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
//   const endLocation = { lat: parseFloat(dlatitude), lng: parseFloat(dlongitude) };
//   const polylinePath = [startLocation, endLocation];

//   return (
//     <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={10}>
//         <Marker position={startLocation} />
//         <Marker position={endLocation} />
//         <Polyline
//           path={polylinePath}
//           options={{
//             strokeColor: 'black',
//             strokeOpacity: 1,
//             strokeWeight: 2,
//           }}
//         />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;

"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = { lat: 28.56341236809311, lng: 77.33609181917045 };

// Dynamically import the Map component to render on client side only
const GoogleMap = dynamic(() => import('@react-google-maps/api').then(mod => mod.GoogleMap), { ssr: false });
const Marker = dynamic(() => import('@react-google-maps/api').then(mod => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import('@react-google-maps/api').then(mod => mod.Polyline), { ssr: false });
const LoadScript = dynamic(() => import('@react-google-maps/api').then(mod => mod.LoadScript), { ssr: false });

const MapComponent = ({ latitude, longitude, dlatitude, dlongitude }) => {
  const [isClient, setIsClient] = useState(false);
  const [startIcon, setStartIcon] = useState(null);
  const [endIcon, setEndIcon] = useState(null);
  useEffect(() => {
    // Set to true only on client side
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Render nothing on the server

  // const startLocation = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
  // const endLocation = { lat: parseFloat(dlatitude), lng: parseFloat(dlongitude) };
  const startLocation = { lat: 48.97097040, lng: 2.28815000 }; // Example coordinates
  const endLocation = { lat: 48.89630890, lng: 2.23623190 }; // Example coordinates
  const polylinePath = [startLocation, endLocation];
  const onLoad = () => {
    setStartIcon({
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: 'white',
      fillOpacity: 1,
      strokeColor: 'black',
      strokeWeight: 2,
    });

    setEndIcon({
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: 'black',
      fillOpacity: 1,
      strokeColor: 'black',
      strokeWeight: 2,
    });
  };
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={10} onLoad={onLoad}>
      {startIcon && <Marker position={startLocation} icon={startIcon} />}
      {endIcon && <Marker position={endLocation} icon={endIcon} />}
        <Polyline
          path={polylinePath}
          options={{
            strokeColor: 'black',
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

