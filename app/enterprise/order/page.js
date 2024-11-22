import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import EnterpriseOrderView from "@/components/enterprise/order-view";
import LayoutPage from "@/components/Layouts/layout"
import { getEnterpriseOrder } from "@/services/enterprise";

const EnterprirseOrderPage = async () =>{
  
    return (
        <LayoutPage>
            <Breadcrumb pageName={`Enterprise Order List`} />
            <EnterpriseOrderView />
        </LayoutPage>
    )
}

export default EnterprirseOrderPage