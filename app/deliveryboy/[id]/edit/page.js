import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EditDeliveryboyPage from "@/components/deliveryboy/edit";
import LayoutPage from "@/components/Layouts/layout";
import EditVehicle from "@/components/vehicle/edit-vehicle";

const EditConsumer = ({ params }) => {
  return (
    <LayoutPage>
      <Breadcrumb pageName={`Edit Delivery boy`} title={"deliveryboy"} />
      <div>
        <EditDeliveryboyPage deliveryboyId={params?.id}/>
        <EditVehicle VehicleId={params?.id} actionType={`deliveryboy`} />
      </div>
    </LayoutPage>
  );
};

export default EditConsumer;
