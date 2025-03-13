"use server";
import { apiClient } from "@/utils/apiHandler";
import { API } from "@/utils/constants";

export const GetDetail = async (ext_id)=>{
  let apiUrl = `${API.getEnterprise}/${ext_id}`;
  const [res] = await apiClient.get(apiUrl);
  return res;
};

export const updateEnterprise = async (params)=>{
  const apiUrl =`${API.getEnterprise}?ext_id=${params.ext_id}`;
  const [res] = await apiClient.put(apiUrl,params);
  return res;
}


export const getOrderByInterpriseEXT = async (search,pageSize,extId)=>{
  const apiStartpoint =`${API.enterpriseOrdersUrl}${extId}`;
  const queryParams = new URLSearchParams();
  if (parseInt(pageSize) > 0) queryParams.append('size', pageSize);
  if (search) queryParams.append('o', search);
  const apiUrl = queryParams.toString() ? `${apiStartpoint}?${queryParams.toString()}` : apiStartpoint;
  const [res] = await apiClient.get(apiUrl);
  return res;

}

export const GetOrderByNumber = async (OrderNumber)=>{
  const apiStartpoint =`${API.viewEnterpriseOrderDetail}${OrderNumber}`;
  const apiUrl = `${apiStartpoint}`;
  const [res] = await apiClient.get(apiUrl);
  return res;
  
}

export const UpdateStatus = async (params) => {
  const apiUrl =`${API.estatus}`;
  const [res] = await apiClient.put(apiUrl,params);
  return res;

};