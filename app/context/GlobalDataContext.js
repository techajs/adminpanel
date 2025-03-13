"use client";
import { GetVehicles, GetVehicleTypes } from "@/server";
import { GetCity, GetCountry, GetState, GetWorkType } from "@/services/common";
import { createContext, useContext, useState, useEffect } from "react";

const GlobalDataContext = createContext();

export const useGlobalData = () => {
  return useContext(GlobalDataContext);
};

export const GlobalDataProvider = ({ children }) => {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [workType, setWorkType] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  // Function to fetch all data once after login
  const fetchAllData = async () => {
    try {
      const [countryRes, stateRes, cityRes, workTypeRes, vehicleTypeRes, vehicleRes] = await Promise.all([
        GetCountry(),
        GetState(),
        GetCity(),
        GetWorkType(),
        GetVehicleTypes(),
        GetVehicles(),
      ]);

      setCountry(countryRes);
      setState(stateRes);
      setCity(cityRes);
      setWorkType(workTypeRes);
      setVehicleType(vehicleTypeRes);
      setVehicle(vehicleRes);
    } catch (error) {
      console.error("Error fetching global data:", error);
    }
  };

  // Fetch data only ONCE after login
  useEffect(() => {
    fetchAllData();
  }, []); // Runs only once when component mounts

  return (
    <GlobalDataContext.Provider
      value={{
        country,
        state,
        city,
        vehicleType,
        workType,
        vehicle,
        fetchAllData, // Optionally, allow refetching
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
