import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import EditConsumerVeiw from "@/components/consumer/edit.view"
import LayoutPage from "@/components/Layouts/layout"


const EditEnterprise = ({params}) =>{
  
  return (
    <LayoutPage>
        <Breadcrumb pageName={`Edit consumer`} title={`consumer`} />
        <EditConsumerVeiw consumerId={params.id}/>  
    </LayoutPage>
    
  )
}

export default EditEnterprise