import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LayoutPage from "@/components/Layouts/layout";

export default function VehiclePage() {
  return (
    <LayoutPage>
      <Breadcrumb pageName="Manage vehicle types" />
      <h1>vehicle list</h1>
    </LayoutPage>
  );
}
