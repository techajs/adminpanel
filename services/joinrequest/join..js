import { getJoinlist, updateJoinStatus } from "@/app/_lib/action";
import { API } from "@/utils/constants";


export const JoinRequest = async (page, status,search) => {
  let apiStartpoint = API.getJoinRequest;
  let apiUrl='';
  let addon=''
  let addSearch=''
  if(parseInt(page) > 0){
    if(status && status!=''){
        addon=`&status=${status}`;
    }
    apiUrl=`${apiStartpoint}?page=${page}${addon}`
  }
  if(status && status!=''){
    if(parseInt(page) > 0){
        addon=`&page=${page}`;
    }
    apiUrl=`${apiStartpoint}?status=${status}${addon}`
  }
  // Add search query if provided
  if (search && search.trim() !== '') {
    addSearch = `&search=${encodeURIComponent(search)}`;
    apiUrl += addSearch;
  }
  return new Promise((resolve, reject) => {
    const params = {};
    getJoinlist(
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
  let apiUrl = `${API.getJoinDetail}?ext_id=${ext_id}`;
  
  return new Promise((resolve, reject) => {
    const params = {};
    getJoinlist(
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

export const ChangeStatus = async (role,status,ext_id,reason) =>{
  return new Promise((resolve, reject) => {
    const params = {
      role,
      status,
      ext_id,
      reason
  };
    updateJoinStatus(
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
