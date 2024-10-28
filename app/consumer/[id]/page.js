"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import ConsumerInfo from "@/components/consumer/info"
import LayoutPage from "@/components/Layouts/layout";
import { GetConsumerById } from "@/services/consumer";


import { useEffect, useState } from "react";

const ConsumerList = ({params})=>{
    const [consumer, setConsumer] = useState([]); // Initialized to null to handle empty state
    const [extid,setExtid]=useState(params?.id)
    const fetchConsumerView = async (ext_id) => {
      try {
        const response = await GetConsumerById(ext_id);
        setConsumer(response[0]);
      } catch (error) {
        console.log("error ",error)
        setConsumer([]); // Handle error by setting joinview to null
      }
    };
    useEffect(() => {
        fetchConsumerView(extid);
      }, [extid]);
 return (
    <LayoutPage>
        <Breadcrumb pageName="Consumer Info" title="consumer"/>
        <ConsumerInfo  data={consumer}/>
    </LayoutPage>
 )
}

export default ConsumerList