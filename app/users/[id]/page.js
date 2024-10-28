import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import LayoutPage from "@/components/Layouts/layout"

const UserInfo = ({params})=>{
 return (
    <LayoutPage>
        <Breadcrumb pageName="User Info" title="users"/>
        <h1>{params.id}</h1>
    </LayoutPage>
 )
}

export default UserInfo