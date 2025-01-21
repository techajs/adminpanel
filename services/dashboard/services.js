import getDashboardData from "./getdashbaorddata";


export const DashboardService = async (token)=>{
    const dashboard = await getDashboardData(token);
    const data={
        data:dashboard || []
    }

    return data
}
