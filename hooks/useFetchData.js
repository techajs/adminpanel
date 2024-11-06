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
  }, []);

  return { vehicle, vehicleType,fetchVehicle,fetchVehicleType };
};

export default useFetchGlobalData;
