"use client";
import { createContext, useContext, useState } from 'react';

const GlobalDataContext = createContext();

export const useGlobalData = () => {
  return useContext(GlobalDataContext);
};

export const GlobalDataProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [consumersData, setConsumersData] = useState(null);
  const [enterpriseData, setEnterpriseData] = useState(null);
  const [deliveryBoysData, setDeliveryBoysData] = useState(null);
  const [ordersData, setOrdersData] = useState(null);

  const fetchAllData = async () => {
    // Fetch data logic here
  };

  return (
    <GlobalDataContext.Provider value={{ 
      dashboardData, 
      consumersData, 
      enterpriseData, 
      deliveryBoysData, 
      ordersData, 
      fetchAllData 
    }}>
      {children}
    </GlobalDataContext.Provider>
  );
};
