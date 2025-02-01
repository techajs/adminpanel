import { getAdmindashboard } from "@/app/_lib/action";


const getDashboardData =()=>{
    return new Promise((resolve, reject) => {
        const params = {};
        getAdmindashboard(
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

export default getDashboardData