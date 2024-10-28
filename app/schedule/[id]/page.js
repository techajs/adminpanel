import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import LayoutPage from "@/components/Layouts/layout"
import ShiftDetail from "@/components/order/shift-detail-view"

const ShiftDetailList = ({params}) =>{
    return (
        <LayoutPage>
            <Breadcrumb pageName="Schedules Details" title="schedule" />
           <ShiftDetail />
        </LayoutPage>
    )
}

export default ShiftDetailList