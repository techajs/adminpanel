"use server";
import { apiClient } from "@/utils/apiHandler";
import { API } from "@/utils/constants";

export const GetServiceType = async () => {
    const apiUrl = `${API.serviceTypeAll}`;
    const [res] = await apiClient.get(apiUrl);
    return res;
};

export const GetServiceTypeById = async (ext_id) => {
  let apiUrl = `${API.serviceTypeUrl}/${ext_id}`;
  const [res] = await apiClient.get(apiUrl);
  return res?._response;
};

export const updateServiceType = async (params)=>{
  const apiUrl =`${API.serviceTypeUrl}/${params?.extId}`;
  console.log("apiurl",apiUrl)
  const [res] = await apiClient.put(apiUrl,params);
  return res;
}