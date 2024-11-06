import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import LayoutPage from "@/components/Layouts/layout"

const ViewDocument = ({params}) => {
    return (
        <LayoutPage>
            <Breadcrumb pageName="Vehicle Document" title="vehicle"/>
            <h1>vehicle document. {params.id}</h1>
        </LayoutPage>
    )
}

export default ViewDocument