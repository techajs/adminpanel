import { assginMultipleDeliveryboy, getByID, getCommonlist, UpdateStatusQuery } from "@/app/_lib/action";
import { API } from "@/utils/constants";


export const GetDeliveryboys = (page, search,pageSize) => {
  const apiStartpoint =API.getDeliveryboy;
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

export const getAvailableDeliveryboy = () =>{
  const apiStartpoint =API.getDeliveryboy;
  const apiUrl = `${apiStartpoint}/availability`;
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
}

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


export const getOrderByDeliveryboyEXT = async (search,pageSize,ext_id) =>{
  const apiStartpoint =`${API.viewDeliveryBoyOrderUrl}${ext_id}`;
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
      }
    );
  });
}


export const updateDeliveryboy = async (params)=>{
  const apiUrl =`${API.getDeliveryboy}`;
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
      }
    );
  });
}

export const allocatedDeliveryboy = (params) => {
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
      }
    );
  });
};

export const assignDeliveryboyshift = (params) => {
  const apiUrl =`${API.assignDeliveryboy}`;
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
};

export const assignMultipleDeliveryboyshift = (params) => {
  const apiUrl =`${API.assignMultipleDeliveryboy}`;
  return new Promise((resolve, reject) => {
    assginMultipleDeliveryboy(
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
};