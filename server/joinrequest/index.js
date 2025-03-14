"use server"
import { apiClient } from "@/utils/apiHandler";
import { API } from "@/utils/constants";

export const JoinRequests = async (page, status,search) => {
  const apiStartpoint = API.getJoinRequest;
  const queryParams = new URLSearchParams();
  if (parseInt(page) > 0) queryParams.append("page", page);
  if (status && status!='') queryParams.append("status", status);
  if (search) queryParams.append("search", search);
  const apiUrl = `${apiStartpoint}?${queryParams.toString()}`;

  const [res] = await apiClient.get(apiUrl);
  return res;
};

export const GetDetail = async (ext_id)=>{
    let apiUrl = `${API.getJoinDetail}?ext_id=${ext_id}`;
    const [res] = await apiClient.get(apiUrl);
    return res;
}

export const ChangeStatus = async (role,status,ext_id,reason) =>{
    const apiUrl=API.updateJoinStatus+"?ext_id="+ext_id;
    const params = {
        role,
        status,
        ext_id,
        reason
    };
    const [res] = await apiClient.put(apiUrl,params);
    return res;
}