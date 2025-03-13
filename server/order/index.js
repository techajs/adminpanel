"use server";

import { apiClient } from "@/utils/apiHandler";
import { API } from "@/utils/constants";

export const GetOrders = async (page, search, ordertype, pageSize) => {
  const apiStartpoint = API.getAllorderList;
  const queryParams = new URLSearchParams();
  if (parseInt(page) > 0) queryParams.append('page', page);
  if (parseInt(pageSize) > 0) queryParams.append('pagesize', pageSize);
  if (ordertype) queryParams.append('status', ordertype);
  if (search) queryParams.append('search', search);

  const apiUrl = queryParams.toString() ? `${apiStartpoint}?${queryParams.toString()}` : apiStartpoint;
  const [res] = await apiClient.get(apiUrl);
  return res;
 
};

export const GetOrderByNumber = async (orderNumber) => {
  let apiUrl = `${API.viewOrderDetail}${orderNumber}`;
  const [res] = await apiClient.get(apiUrl);
  return res?._response;
};

export const getEnterpriseOrder = async (page, search, ordertype, pageSize,status) => {
  const apiStartpoint = API.enterpriseAllOrder;
  const queryParams = new URLSearchParams();
  
  if (parseInt(page) > 0) queryParams.append('page', page);
  if (parseInt(pageSize) > 0) queryParams.append('pagesize', pageSize);
  if (ordertype) queryParams.append('ordertype', ordertype);
  if (status) queryParams.append('status', status);
  if (search) queryParams.append('o', search);

  const apiUrl = queryParams.toString() ? `${apiStartpoint}?${queryParams.toString()}` : apiStartpoint;
  const [res] = await apiClient.get(apiUrl);
  return res;
}

export const GetOrderDetail = async (OrderNumer)=>{
  let apiUrl = `${API.getOrderById}/${OrderNumer}`;
  const [res] = await apiClient.get(apiUrl);
  return res;
};




