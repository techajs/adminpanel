import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import JoinRequestTable from "@/components/join/table-view";
import LayoutPage from "@/components/Layouts/layout";

const JoinRequest = () => {
  return (
    <LayoutPage>
        <Breadcrumb pageName="Join Request"/>
        <JoinRequestTable/>
    </LayoutPage>
  );    
};

export default JoinRequest;
