import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import ConsumerTable from "@/components/consumer/table-view"
import LayoutPage from "@/components/Layouts/layout"



const Consumers = ()=>{
    
    return (
        <LayoutPage>
            <Breadcrumb pageName="Consumers" />
            <ConsumerTable />
        </LayoutPage>
    )
}

export default Consumers