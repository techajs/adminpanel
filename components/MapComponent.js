"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const GoogleMap = dynamic(() => import('@react-google-maps/api').then(mod => mod.GoogleMap), { ssr: false });
const Marker = dynamic(() => import('@react-google-maps/api').then(mod => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import('@react-google-maps/api').then(mod => mod.Polyline), { ssr: false });
const LoadScript = dynamic(() => import('@react-google-maps/api').then(mod => mod.LoadScript), { ssr: false });

const MapComponent = ({ latitude, longitude, dlatitude, dlongitude }) => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  // const startLocation = { lat: 23.0225, lng: 72.5714 };
  // const endLocation = { lat: 23.0300, lng: 72.5800 }; 
  const startLocation = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
  const endLocation = { lat: parseFloat(dlatitude), lng: parseFloat(dlongitude) };
  const polylinePath = [startLocation, endLocation];

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={startLocation} zoom={10}>
        {/* Markers with labels "A" and "B" */}
        <Marker position={startLocation} label="A" />
        <Marker position={endLocation} label="B" />

        {/* Polyline to connect start and end locations */}
        <Polyline
          path={polylinePath}
          options={{
            strokeColor: 'black',
            strokeOpacity: 1,
            strokeWeight: 3,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
