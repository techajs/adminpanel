"use client";
import React from "react";
import dynamic from "next/dynamic";

const GoogleMap = dynamic(() => import("@react-google-maps/api").then((mod) => mod.GoogleMap), { ssr: false });
const Marker = dynamic(() => import("@react-google-maps/api").then((mod) => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import("@react-google-maps/api").then((mod) => mod.Polyline), { ssr: false });
const LoadScript = dynamic(() => import("@react-google-maps/api").then((mod) => mod.LoadScript), { ssr: false });

const MapComponent = ({ latitude, longitude, dlatitude, dlongitude, multiple = false, locations = [] }) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const startLocation = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

  let markers = [<Marker position={startLocation} label="A" key="origin" />];
  let polylinePath = [startLocation];
  if (multiple) {
    // Generate markers and polyline path for multiple drop-off locations
    locations.forEach((loc, index) => {
      const location = { lat: parseFloat(loc.lat), lng: parseFloat(loc.long) };
      markers.push(<Marker position={location} label={`Dropoff ${index + 1}`} key={`location-${index}`} />);
      polylinePath.push(location);
    });
  } else {
    const endLocation = { lat: parseFloat(dlatitude), lng: parseFloat(dlongitude) };
    markers.push(<Marker position={endLocation} label="B" key="destination" />);
    polylinePath.push(endLocation);
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={startLocation} zoom={10}>
        {/* Render markers dynamically */}
        {markers}

        {/* Polyline connecting all points */}
        <Polyline
          path={polylinePath}
          options={{
            strokeColor: "black",
            strokeOpacity: 1,
            strokeWeight: 3,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
