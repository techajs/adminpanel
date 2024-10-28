import { getByID, getCommonlist } from "@/app/_lib/action";
import { API } from "@/utils/constants";


export const GetDeliveryboys = (page, search) => {
  let apiStartpoint = API.getDeliveryboy;
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

export const GetDeliveryboyById = async (ext_id)=>{
  let apiUrl = `${API.getDeliveryboy}/${ext_id}`;
  
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
