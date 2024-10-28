import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CreateNewUser from "@/components/consumer/create";
import LayoutPage from "@/components/Layouts/layout";

const CreateUser = ({ params }) => {
  return (
    <LayoutPage>
      {params?.role === "consumer" && (
        <>
          <Breadcrumb pageName={`Create ${params.role}`} title="consumer" />
          <h1>Create {params.role}</h1>
        </>
      )}

      {params?.role === "enterprise" && (
        <>
          <Breadcrumb pageName={`Create ${params.role}`} title="enterprise" />
          <h1>Create user {params.role}</h1>
        </>
      )}
      {params?.role === "deliveryboy" && (
        <>
          <Breadcrumb pageName={`Create ${params.role}`} title="deliveryboy"/>
          <CreateNewUser />
        </>
      )}
    </LayoutPage>
  );
};

export default CreateUser;
