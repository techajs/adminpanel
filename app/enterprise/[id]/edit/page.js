import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import EditEnterprisePage from "@/components/enterprise/views/edit-view"
import LayoutPage from "@/components/Layouts/layout"


const EditEnterprise = ({params}) =>{


  return (
    <LayoutPage>
       <Breadcrumb pageName={`Edit Enterpise`} title={"enterprise"} />
       <EditEnterprisePage enterpriseId={params.id}/>
    </LayoutPage>
    
  )
}

export default EditEnterprise