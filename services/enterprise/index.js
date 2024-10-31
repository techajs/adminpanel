import { getByID, getCommonlist } from "@/app/_lib/action";
import { API } from "@/utils/constants";



export const GetEnterprises = (page, search,pageSize) => {
  const apiStartpoint =API.getEnterprise;
  const queryParams = new URLSearchParams();
  if (parseInt(page) > 0) queryParams.append('page', page);
  if (parseInt(pageSize) > 0) queryParams.append('pagesize', pageSize);
  if (search) queryParams.append('search', search);
  const apiUrl = `${apiStartpoint}?${queryParams.toString()}`;
  return new Promise((resolve, reject) => {
    const params = {};
    getCommonlist(
      apiUrl,
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          const data = successResponse[0]._response;
          resolve(data);
        } else {
          reject([]);
        }
      },
      (errorResponse) => {
        reject([]);
      }
    );
  });
};


export const GetDetail = async (ext_id)=>{
  let apiUrl = `${API.getEnterprise}/${ext_id}`;
  
  return new Promise((resolve, reject) => {
    const params = {};
    getByID(
      apiUrl,
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          const data = successResponse[0]._response;
          resolve(data);
        } else {
          reject([]);
        }
      },
      (errorResponse) => {
        reject([]);
      }
    );
  });
};

export const getOrderByInterpriseEXT = async (search,pageSize,ext_id)=>{
  
  const apiStartpoint =`${API.enterpriseOrdersUrl}${ext_id}`;
  const queryParams = new URLSearchParams();
  if (parseInt(pageSize) > 0) queryParams.append('size', pageSize);
  if (search) queryParams.append('o', search);
  const apiUrl = `${apiStartpoint}?${queryParams.toString()}`;
  return new Promise((resolve, reject) => {
    const params = {};
    getByID(
      apiUrl,
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          const data = successResponse[0]._response;
          resolve(data);
        } else {
          reject([]);
        }
      },
      (errorResponse) => {
        reject([]);
      }
    );
  });
}



export const GetOrderByNumber = async (OrderNumber)=>{
  const apiStartpoint =`${API.viewEnterpriseOrderDetail}${OrderNumber}`;
  const apiUrl = `${apiStartpoint}`;
  return new Promise((resolve, reject) => {
    const params = {};
    getByID(
      apiUrl,
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          const data = successResponse[0]._response;
          resolve(data);
        } else {
          reject([]);
        }
      },
      (errorResponse) => {
        reject([]);
      }
    );
  });
}