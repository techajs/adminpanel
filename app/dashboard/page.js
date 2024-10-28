
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DashboardLayout from "@/components/Dashboard/DashbordLayout";
import LayoutPage from "@/components/Layouts/layout";

const Dashboard = () => {
  return (
    <LayoutPage>
      {/* <Breadcrumb pageName="Dashboard" /> */}
      <DashboardLayout />
    </LayoutPage>
  );
};

export default Dashboard;
