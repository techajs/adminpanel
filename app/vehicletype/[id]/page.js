
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LayoutPage from "@/components/Layouts/layout";
import VehicleTypeView from "@/components/vehicle/vehicletype-view";

const ViewVehicle = ({ params }) => {
  return (
    <LayoutPage>
      <Breadcrumb pageName="View Vehicle Type" title="vehicletype" />
      <VehicleTypeView VehicleTypeId={params?.id}  />
    </LayoutPage>
  );
};

export default ViewVehicle;
