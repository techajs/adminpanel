"use client";
import { GetVehicles, GetVehicleTypes } from '@/services';
import { GetCity, GetCountry, GetState, GetWorkType } from '@/services/common';
import { createContext, useContext, useState } from 'react';

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

  const fetchVehicleType = async () => {
    try {
      const response = await GetVehicleTypes();
      setVehicleType(response);
    } catch (error) {
      setVehicleType([]);
    }
  };
  const fetchVehicle = async () => {
    try {
      const response = await GetVehicles();
      setVehicle(response);
    } catch (error) {
      setVehicle([]);
    }
  };
  const fetchDeliveryboy = async () => {
    try {
      const response = await GetVehicles();
      console.log('vehicle',response)
      setVehicle(response);
    } catch (error) {
      setVehicle([]);
    }
  };
  const fetchCountry = async () => {
    try {
      const response = await GetCountry();
      setCountry(response);
    } catch (error) {
      setCountry([]);
    }
  };
  const fetchState = async () => {
    try {
      const response = await GetState();
      setState(response);
    } catch (error) {
      setState([]);
    }
  };
  const fetchCity = async () => {
    try {
      const response = await GetCity();
      setCity(response);
    } catch (error) {
      setCity([]);
    }
  };
  const fetchWorkType = async () => {
    try {
      const response = await GetWorkType();
     
      setWorkType(response);
    } catch (error) {
      setWorkType([]);
    }
  };

  return (
    <GlobalDataContext.Provider value={{ 
      country, 
      state, 
      city, 
      vehicleType, 
      workType, 
      vehicle ,
      fetchVehicleType,
      fetchVehicle,
      fetchCountry,
      fetchState,
      fetchCity,
      fetchWorkType,
      fetchDeliveryboy
    }}>
      {children}
    </GlobalDataContext.Provider>
  );
};
