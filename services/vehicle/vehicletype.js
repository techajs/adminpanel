// Ensure the path is correct

import { getVehicleData } from "./getvehicledata";

export const getVehicletype = async () => {
  const header = [
    {
      name: "Vehicle Type",
      createDate: "Created Date",
      status: "Status",
      actions: "Actions",
    },
  ];

  try {
    const vehicle = await getVehicleData();
    return {
      data: vehicle,
      headerTitle: header,
    };
  } catch (error) {
    return {
      data: [],
      headerTitle: header,
    };
  }
};
