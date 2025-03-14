"use client";
import { GetCity, GetCountry, GetState, GetWorkType } from "@/server";
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

  // Function to fetch all data once after login
  const fetchAllData = async () => {
    try {

      const countryRes = await GetCountry()
      const stateRes = await GetState()
      const cityRes = await GetCity()
      const workTypeRes = await GetWorkType()
      setCountry(countryRes?.response);
      setState(stateRes?.response);
      setCity(cityRes?.response);
      setWorkType(workTypeRes?.response);
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
        workType,
        fetchAllData, // Optionally, allow refetching
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
