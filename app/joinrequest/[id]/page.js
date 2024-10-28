import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import NewJoinRequestPage from "@/components/join/detail";
import LayoutPage from "@/components/Layouts/layout";

export default function Detail({params}){
    const {id}=params
    return (
        <LayoutPage>
            <Breadcrumb pageName="User Information" title="joinrequest"/>
            <NewJoinRequestPage extId={id}/>
        </LayoutPage>
    )
}