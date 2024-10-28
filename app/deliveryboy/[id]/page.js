"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import DeliveryboyInfo from "@/components/deliveryboy/info";
import LayoutPage from "@/components/Layouts/layout";
import { GetDeliveryboyById } from "@/services/deliveryboy";
import { useEffect, useState } from "react";

const DeliveryboyView = ({params})=>{
    const [deliveryboy, setDeliveryboy] = useState([]); // Initialized to null to handle empty state
    const [extid,setExtid]=useState(params?.id)
    const fetchDeliveryboyView = async (ext_id) => {
      try {
        const response = await GetDeliveryboyById(ext_id);
        setDeliveryboy(response);
      } catch (error) {
        setDeliveryboy([]); // Handle error by setting joinview to null
      }
    };
    useEffect(() => {
        fetchDeliveryboyView(extid);
      }, [extid]);

 return (
    <LayoutPage>
        <Breadcrumb pageName="Delivery Boy Info" title="deliveryboy"/>
        <DeliveryboyInfo data={deliveryboy} />
    </LayoutPage>
 )
}

export default DeliveryboyView