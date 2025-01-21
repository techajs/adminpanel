import { getByID, getCommonlist, UpdateStatusQuery } from "@/app/_lib/action";
import { API } from "@/utils/constants";


export const GetConsumers = (page, search,pageSize,token) => {
  const apiStartpoint =API.getConsumer;
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
      },
      token
    );
  });
};

export const GetConsumerById = async (ext_id,token) => {
  let apiUrl = `${API.getConsumer}/${ext_id}`;
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


export const GetOrderById = async (search,pageSize,ext_id,token) => {
  const apiStartpoint =`${API.viewConsumerOrderUrl}${ext_id}`;
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
      },
      token
    );
  });
};


export const updateConsumer = async (params,token)=>{
  const apiUrl =`${API.getConsumer}`;
  console.log("url => ",apiUrl)
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
      },
      token
    );
  });
}
