import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LayoutPage from "@/components/Layouts/layout";
import VehicleTableView from "@/components/vehicle/table-view";

export default function VehiclePage() {
  return (
    <LayoutPage>
      <Breadcrumb pageName="Manage vehicle" />
      <VehicleTableView/>
    </LayoutPage>
  );
}
