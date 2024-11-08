"use client";
const { useGlobalData } = require("@/app/context/GlobalDataContext");
const { useEffect } = require("react");

const useFetchGlobalData = () => {
  const {
    vehicle,
    vehicleType,
    country,
    state,
    city,
    workType,
    fetchCountry,
    fetchState,
    fetchCity,
    fetchWorkType,
    fetchVehicle,
    fetchVehicleType,
  } = useGlobalData();

  useEffect(() => {
    if (!vehicle) fetchVehicle();
    if (!country) fetchCountry();
    if (!vehicleType) fetchVehicleType();
    if (!state) fetchState();
    if (!city) fetchCity();
    if (!workType) fetchWorkType();
  }, [vehicle, vehicleType, country, state, city, workType]); 

  // Ensure that all values are returned if needed
  return { vehicle, vehicleType, country, state, city, workType, fetchCountry,fetchState,fetchCity };
};

export default useFetchGlobalData;
