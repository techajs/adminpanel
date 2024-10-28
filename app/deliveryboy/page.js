import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DeliveryboyTable from "@/components/deliveryboy/table-view"
import LayoutPage from "@/components/Layouts/layout"


const Deliveryboy = ()=>{
    return (
        <LayoutPage>
            <Breadcrumb pageName="Delivery Boy" />
            <DeliveryboyTable />
        </LayoutPage>
    )
}

export default Deliveryboy