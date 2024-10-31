import { getByID, getCommonlist } from "@/app/_lib/action";
import { API } from "@/utils/constants";

// export const GetOrders = (page, search,ordertype,pageSize) => {
//   let apiStartpoint = API.getAllorderList;
//   let apiUrl = "";
//   let status='';
//   if(ordertype){
//     status = `&status=${ordertype}`;
//   }
//   let addon='';
  
//   if (parseInt(page) > 0) {
//     if (search && search != "") {
//       addon = `&search=${search}`;
//     }
//     apiUrl = `${apiStartpoint}?page=${page}${addon}${status}`;
//   }
//   if (search && search != "") {
//     if (parseInt(page) > 0) {
//       addon = `&page=${page}`;
//     }
//     apiUrl = `${apiStartpoint}?search=${search}${addon}${status}`;
//   }

//   if(parseInt(pageSize) > 0){
//     if (parseInt(page) > 0) {
//       addon = `&page=${page}`;
//     }
//     if (search && search != "") {
//       addon = `&search=${search}`;
//     }
//     apiUrl = `${apiStartpoint}?pagesize=${pageSize}${addon}${status}`;
//   }
//   return new Promise((resolve, reject) => {
//     const params = {};
//     getCommonlist(
//       apiUrl,
//       params,
//       (successResponse) => {
//         if (successResponse[0]._success) {
//           const data = successResponse[0]._response;
//           resolve(data);
//         } else {
//           reject([]);
//         }
//       },
//       (errorResponse) => {
//         reject([]);
//       }
//     );
//   });
// };

export const GetOrders = (page, search, ordertype, pageSize) => {
  const apiStartpoint = API.getAllorderList;
  const queryParams = new URLSearchParams();

  if (parseInt(page) > 0) queryParams.append('page', page);
  if (parseInt(pageSize) > 0) queryParams.append('pagesize', pageSize);
  if (ordertype) queryParams.append('status', ordertype);
  if (search) queryParams.append('search', search);

  const apiUrl = `${apiStartpoint}?${queryParams.toString()}`;

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

export const GetOrderByNumber = async (orderNumber) => {
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
      }
    );
  });
};