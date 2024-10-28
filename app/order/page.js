import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import LayoutPage from "@/components/Layouts/layout"
import OrderView from "@/components/order/order-view"

const OrderList = () =>{
    return (
        <LayoutPage>
            <Breadcrumb pageName="Order List" />
            <OrderView />
        </LayoutPage>
    )
}

export default OrderList