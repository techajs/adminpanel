import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import LayoutPage from "@/components/Layouts/layout"

const DocumentList = () =>{
    return (
        <LayoutPage>
            <Breadcrumb pageName="Order List" />
            <h1>Document list</h1>
        </LayoutPage>
    )
}

export default DocumentList