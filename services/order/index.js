import { getByID, getCommonlist } from "@/app/_lib/action";
import { API } from "@/utils/constants";

export const GetOrders = (page, search,ordertype) => {
  let apiStartpoint = API.getAllorderList;
  let apiUrl = "";
  let status='';
  if(ordertype){
    status = `&status=${ordertype}`;
  }
  let addon='';
  
  if (parseInt(page) > 0) {
    if (search && search != "") {
      addon = `&search=${search}`;
    }
    apiUrl = `${apiStartpoint}?page=${page}${addon}${status}`;
  }
  if (search && search != "") {
    if (parseInt(page) > 0) {
      addon = `&page=${page}`;
    }
    apiUrl = `${apiStartpoint}?search=${search}${addon}${status}`;
  }
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


export const GetOrderDetail = async (OrderNumer)=>{
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
      }
    );
  });
};