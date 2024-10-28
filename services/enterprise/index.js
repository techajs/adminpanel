import { getByID, getCommonlist } from "@/app/_lib/action";
import { API } from "@/utils/constants";



export const GetEnterprises = (page, search) => {
  let apiStartpoint = API.getEnterprise;
  let apiUrl = "";
  let addon = "";
  if (parseInt(page) > 0) {
    if (search && search != "") {
      addon = `&search=${search}`;
    }
    apiUrl = `${apiStartpoint}?page=${page}${addon}`;
  }
  if (search && search != "") {
    if (parseInt(page) > 0) {
      addon = `&page=${page}`;
    }
    apiUrl = `${apiStartpoint}?search=${search}${addon}`;
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