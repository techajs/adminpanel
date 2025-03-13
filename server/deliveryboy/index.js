"use server";

import { apiClient } from "@/utils/apiHandler";
import { API } from "@/utils/constants";

export const getOrderByDeliveryboyEXT = async (search,pageSize,ext_id) =>{
  const apiStartpoint =`${API.viewDeliveryBoyOrderUrl}${ext_id}`;
  const queryParams = new URLSearchParams();
  if (parseInt(pageSize) > 0) queryParams.append('size', pageSize);
  if (search) queryParams.append('o', search);
  const apiUrl = queryParams.toString() ? `${apiStartpoint}?${queryParams.toString()}` : apiStartpoint;
   const [res] = await apiClient.get(apiUrl);
   return res;
}

export const activeAndInactiveDeliveyboy = async (params,id)=>{
  const apiUrl =`${API.deliveryboyUpdateavailability}/${id}`;
  const [res] = await apiClient.put(apiUrl,params);
   return res;
}

export const getAvailableDeliveryboy = async () =>{
  const apiStartpoint =API.getDeliveryboy;
  const apiUrl = `${apiStartpoint}/availability`;
  const [res] = await apiClient.get(apiUrl);
  return res;
}

export const allocatedDeliveryboy = async (params) => {
  const apiUrl =`${API.estatus}`;
  const [res] = await apiClient.put(apiUrl,params);
  return res;
};

export const assignDeliveryboyshift = async (params) => {
  const apiUrl =`${API.assignDeliveryboy}`;
  const [res] = await apiClient.put(apiUrl,params);
  return res;
};

export const assignMultipleDeliveryboyshift = async (params) => {
  const apiUrl =`${API.assignMultipleDeliveryboy}`;
  const [res] = await apiClient.put(apiUrl,params);
  return res;
};

