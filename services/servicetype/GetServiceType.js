
import { getByID, getServiceTypes, UpdateStatusQuery } from "@/app/_lib/action";
import { API } from "@/utils/constants";
export const GetServiceType = () => {

    return new Promise((resolve, reject) => {
      const params = {};
      getServiceTypes(
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

export const GetServiceTypeById = async (ext_id) => {
  let apiUrl = `${API.serviceTypeUrl}/${ext_id}`;
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

export const updateServiceType = async (params)=>{
  const apiUrl =`${API.serviceTypeUrl}`;
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
      }
    );
  });
}