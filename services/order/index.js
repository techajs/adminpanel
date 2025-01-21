import { getByID, getCommonlist } from "@/app/_lib/action";
import { API } from "@/utils/constants";


export const GetOrders = (page, search, ordertype, pageSize,token) => {
  const apiStartpoint = API.getAllorderList;
  const queryParams = new URLSearchParams();
  if (parseInt(page) > 0) queryParams.append('page', page);
  if (parseInt(pageSize) > 0) queryParams.append('pagesize', pageSize);
  if (ordertype) queryParams.append('status', ordertype);
  if (search) queryParams.append('search', search);

  const apiUrl = queryParams.toString() ? `${apiStartpoint}?${queryParams.toString()}` : apiStartpoint;

  return new Promise((resolve, reject) => {
    const params = {};
    getCommonlist(
      apiUrl,
      params,
      (successResponse) => {if (successResponse[0]._success) { resolve(successResponse[0]._response);
        } else { reject([]);}
      },
      (errorResponse) => {reject([]);},
      token
    );
  });
};

export const GetOrderDetail = async (OrderNumer,token)=>{
  let apiUrl = `${API.getOrderById}/${OrderNumer}`;
  
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
      },
      token
    );
  });
};

export const GetOrderByNumber = async (orderNumber,token) => {
  let apiUrl = `${API.viewOrderDetail}${orderNumber}`;
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

export const getEnterpriseOrder = (page, search, ordertype, pageSize,status,token) => {
  const apiStartpoint = API.enterpriseAllOrder;
  const queryParams = new URLSearchParams();
  
  if (parseInt(page) > 0) queryParams.append('page', page);
  if (parseInt(pageSize) > 0) queryParams.append('pagesize', pageSize);
  if (ordertype) queryParams.append('ordertype', ordertype);
  if (status) queryParams.append('status', status);
  if (search) queryParams.append('o', search);

  const apiUrl = queryParams.toString() ? `${apiStartpoint}?${queryParams.toString()}` : apiStartpoint;

  return new Promise((resolve, reject) => {
    const params = {};
    getCommonlist(
      apiUrl,
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          resolve(successResponse[0]._response);
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