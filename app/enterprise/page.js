import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EnterpriseTable from "@/components/enterprise/table-view";
import LayoutPage from "@/components/Layouts/layout";
const EnterpriseJoin = () => {
  return (
    <LayoutPage>
      <Breadcrumb pageName="Enterprises"/>
      <EnterpriseTable />
    </LayoutPage>
  );
};

export default EnterpriseJoin;
