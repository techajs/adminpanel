import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LayoutPage from "@/components/Layouts/layout";
import ShiftView from "@/components/order/shift-view";

const ShiftList = () => {
  return (
    <LayoutPage>
      <Breadcrumb pageName="Schedules List" />

      <ShiftView />
    </LayoutPage>
  );
};

export default ShiftList;
