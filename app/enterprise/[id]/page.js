"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EnterpriseInfo from "@/components/enterprise/info";
import LayoutPage from "@/components/Layouts/layout";
import { GetDetail } from "@/services/enterprise";
import { useAuthToken } from "@/utils/constants";
import { useEffect, useState } from "react";

const EnterpriseList = ({ params }) => {
  const [enterprise, setEnterprise] = useState([]); // Initialized to null to handle empty state
  const [extid, setExtid] = useState(params?.id);
  const token=useAuthToken()
  const fetchEnterpriseView = async (ext_id) => {
    try {
      const response = await GetDetail(ext_id,token);
      setEnterprise(response[0]);
    } catch (error) {
      setEnterprise([]); // Handle error by setting joinview to null
    }
  };

  useEffect(()=>{
    fetchEnterpriseView(extid)
  },[extid])
  return (
    <LayoutPage>
      <Breadcrumb pageName="Enterprise Info" title="enterprise" />
      <EnterpriseInfo data={enterprise} />
    </LayoutPage>
  );
};

export default EnterpriseList;
