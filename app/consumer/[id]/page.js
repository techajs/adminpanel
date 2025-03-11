"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import ConsumerInfo from "@/components/consumer/info"
import LayoutPage from "@/components/Layouts/layout";
import { GetConsumerInfo } from "@/server/userController";


import { useEffect, useState } from "react";

const ConsumerList = ({params})=>{
    const [consumer, setConsumer] = useState([]); // Initialized to null to handle empty state
    const [extid,setExtid]=useState(params?.id)
    const fetchConsumerView = async (ext_id) => {
      
      try {
        const result = await GetConsumerInfo(ext_id)
        if(result?._success){
          setConsumer(result?._response[0])
        }
      } catch (error) {
        setConsumer([]); // Handle error by setting joinview to null
      }
    };
    useEffect(() => {
        fetchConsumerView(extid);
      }, [extid]);
 return (
    <LayoutPage>
        <Breadcrumb pageName="Consumer Info" title="consumer"/>
        <ConsumerInfo  data={consumer} extId={extid}/>
    </LayoutPage>
 )
}

export default ConsumerList