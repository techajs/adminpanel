"use server";
import { apiClient } from "@/utils/apiHandler";
import { API } from "@/utils/constants";

export const getConsumer = async (page, search, pageSize) => {
  const apiStartpoint = API.getConsumer;
  const queryParams = new URLSearchParams();
  if (parseInt(page) > 0) queryParams.append("page", page);
  if (parseInt(pageSize) > 0) queryParams.append("pagesize", pageSize);
  if (search) queryParams.append("search", search);
  const apiUrl = `${apiStartpoint}?${queryParams.toString()}`;
  const [res] = await apiClient.get(apiUrl);
  return res;
};

export const GetConsumerInfo = async (ext_id) => {
    let apiUrl = `${API.getConsumer}/${ext_id}`;
    const [res] = await apiClient.get(apiUrl);
    return res;
}

export const getEnterprise = async (page, search, pageSize) => {
  const apiStartpoint = API.getEnterprise;
  const queryParams = new URLSearchParams();
  if (parseInt(page) > 0) queryParams.append("page", page);
  if (parseInt(pageSize) > 0) queryParams.append("pagesize", pageSize);
  if (search) queryParams.append("search", search);
  const apiUrl = `${apiStartpoint}?${queryParams.toString()}`;
  const [res] = await apiClient.get(apiUrl);
  return res;
};

export const getDeliveryboy = async (page, search, pageSize) => {
    const apiStartpoint =API.getDeliveryboy;
    const queryParams = new URLSearchParams();
    if (parseInt(page) > 0) queryParams.append('page', page);
    if (parseInt(pageSize) > 0) queryParams.append('pagesize', pageSize);
    if (search) queryParams.append('search', search);
    const apiUrl = `${apiStartpoint}?${queryParams.toString()}`;
    const [res] = await apiClient.get(apiUrl);
    return res;
  };

  export const GetDeliveryboyById = async (ext_id)=>{
    let apiUrl = `${API.getDeliveryboy}/${ext_id}`;
    const [res] = await apiClient.get(apiUrl);
    // console.log("res",res)
    return res;
  };

  export const updateDeliveryboy = async (params)=>{
    const apiUrl =`${API.getDeliveryboy}?ext_id=${params.ext_id}`;
    const [res] = await apiClient.put(apiUrl,params);
    return res;
  }
