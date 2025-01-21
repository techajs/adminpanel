import {getCommonlist, UpdateQuery, UpdateStatusQuery } from "@/app/_lib/action";
import { API, getValidedImageUrl } from "@/utils/constants";

export const GetVehicles = (token) => {
  const apiStartpoint =API.vehicles;

  const apiUrl = `${apiStartpoint}`;
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

export const GetVehicleTypes = (token) => {
  const apiStartpoint =API.vehicletypesUrl;
  const apiUrl = `${apiStartpoint}`;
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

export const updateVehicle = (params,token) => {
  const apiUrl =`${API.vehicles}`;
  return new Promise((resolve, reject) => {
    UpdateQuery(
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

export const updateVehicleType = (params,token) => {
  const apiUrl =`${API.vehicletypesUrl}/${vehicleTypeId}`;
  return new Promise((resolve, reject) => {
    UpdateQuery(
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
};

// delete vehicle query
export const UdateVehicleStatus = (params,Id,token) => {
  const apiUrl =`${API.vehiclesStatus}/${Id}`;
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

//update vehicle status 
export const UdateVehicleTypeStatus = (params,Id,token) => {
  const apiUrl =`${API.vehiclesTypeStatus}/${Id}`;
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
};


export const getImageByUrl = async (url) => {
  const getRes = await getValidedImageUrl(url);
  return getRes;
};
