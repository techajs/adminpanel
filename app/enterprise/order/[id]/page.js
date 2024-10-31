"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import LayoutPage from "@/components/Layouts/layout"
import { GetOrderByNumber } from "@/services/enterprise";
import { useEffect, useState } from "react";

const EorderView = ({params})=>{
    const [order, setOrder] = useState(null);
    const fetchEnterpriseOrder = async (ext_id) => {
      try {
        const response = await GetOrderByNumber(ext_id);
        console.log(response)
        setOrder(response);
      } catch (error) {
        setOrder([]); // Handle error by setting to empty array
      }
    };
    useEffect(() => {
        if (params?.id) {
          fetchEnterpriseOrder(params.id);
        }
      }, [params?.id]);
    return (
        <LayoutPage>
             <Breadcrumb pageName="Order Details" title="enterprise" />
            <h1>enterpriseView {params.id}</h1>
        </LayoutPage>
    )
}

export default EorderView