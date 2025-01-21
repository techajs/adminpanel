import { getByID, getCommonlist, UpdateStatusQuery } from "@/app/_lib/action";
import { API } from "@/utils/constants";



export const GetEnterprises = (page, search,pageSize,token) => {
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
      },token
    );
  });
};


export const GetDetail = async (ext_id,token)=>{
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
      },token
    );
  });
};

export const getOrderByInterpriseEXT = async (search,pageSize,extId,token)=>{
  
  const apiStartpoint =`${API.enterpriseOrdersUrl}${extId}`;
  console.log('url',apiStartpoint)
  const queryParams = new URLSearchParams();
  if (parseInt(pageSize) > 0) queryParams.append('size', pageSize);
  if (search) queryParams.append('o', search);
  const apiUrl = queryParams.toString() ? `${apiStartpoint}?${queryParams.toString()}` : apiStartpoint;
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
      },token
    );
  });
}



export const GetOrderByNumber = async (OrderNumber,token)=>{
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
      },token
    );
  });
}

export const updateEnterprise = async (params,token)=>{
  const apiUrl =`${API.getEnterprise}`;
  return new Promise((resolve, reject) => {
    UpdateStatusQuery(
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
        reject(errorResponse);
      },token
    );
  });
}

//update vehicle status 
export const UpdateStatus = (params,token) => {
  const apiUrl =`${API.estatus}`;
  return new Promise((resolve, reject) => {
    UpdateStatusQuery(
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
        reject(errorResponse);
      },token
    );
  });
};