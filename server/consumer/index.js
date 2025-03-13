"use server";
import { apiClient } from "@/utils/apiHandler";
import { API } from "@/utils/constants";

export const GetOrderById = async (search, pageSize, ext_id) => {
  const apiStartpoint = `${API.viewConsumerOrderUrl}${ext_id}`;
  const queryParams = new URLSearchParams();
  if (parseInt(pageSize) > 0) queryParams.append("size", pageSize);
  if (search) queryParams.append("o", search);
  const apiUrl = queryParams.toString()
    ? `${apiStartpoint}?${queryParams.toString()}`
    : apiStartpoint;
  const [res] = await apiClient.get(apiUrl);
  return res;
};


export const GetConsumerById = async (ext_id) => {
  let apiUrl = `${API.getConsumer}/${ext_id}`;
  const [res] = await apiClient.get(apiUrl);
  return res;
  
};

export const updateConsumer = async (params)=>{
  const apiUrl =`${API.getConsumer}?ext_id=${params.ext_id}`;
  const [res] = await apiClient.put(apiUrl,params);
  return res;
}