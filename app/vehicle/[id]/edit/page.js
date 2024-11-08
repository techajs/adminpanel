import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LayoutPage from "@/components/Layouts/layout";

import EditVehicle from "@/components/vehicle/edit-vehicle";

const EditVehiclePage = ({ params }) => {
  

  return (
    <LayoutPage>
      <Breadcrumb pageName="Edit Vehicle" title="vehicle" />
      <EditVehicle VehicleId={params?.id} actionType={`vehicle`}/>
    </LayoutPage>
  );
};

export default EditVehiclePage;
