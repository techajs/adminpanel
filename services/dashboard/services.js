import getDashboardData from "./getdashbaorddata";


export const DashboardService = async ()=>{
    const dashboard = await getDashboardData();
    const data={
        data:dashboard || []
    }

    return data
}
