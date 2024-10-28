import { getVehicletype } from "./vehicle/vehicletype";
import { getEnterpriseData } from "./enterprise/enterpriseData"; // Import the enterprise data fetching function

const getData = async (name) => {
  try {
    let data;
    let headerTitle;

    switch (name) {
      case 'vehicle':
        const { data: vehicleData } = await getVehicletype();
        data = vehicleData;
        headerTitle = [
          { name: 'Vehicle Type', createDate: "Created Date", status: "Status", actions: "Actions" }
        ];
        break;

      case 'enterprise':
        const { data: enterpriseData } = await getEnterpriseData(); // Fetch enterprise data
        data = enterpriseData;
        headerTitle = [
          { name: 'Enterprise Data', createDate: "Created Date", status: "Status", actions: "Actions" }
        ];
        break;

      default:
        throw new Error(`Unknown data type: ${name}`);
    }

    return { data, headerTitle };

  } catch (error) {
    console.error('Error fetching data:', error); // Optional: log the error
    return {
      data: [],
      headerTitle: [
        { name: 'Data', createDate: "Created Date", status: "Status", actions: "Actions" }
      ],
    };
  }
};

export default getData;
