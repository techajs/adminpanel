"use client";

import React, { useState, useEffect } from "react";

import DeliveryboyView from "./view/delivery-boy-view";
import EnterpriseView from "./view/enterprise-view";
import ConsumerView from "./view/consumer-view";
import { GetDetail } from "@/server/joinrequest";


function NewJoinRequestPage({extId}) {
  const [joinview, setJoinview] = useState(null); // Initialized to null to handle empty state
  const [extid,setExtid]=useState(extId)
  const fetchJoinView = async (ext_id) => {
    try {
      const res = await GetDetail(ext_id);
      if(res?._success){
        const response=res?._response
        setJoinview(response[0]);
      }
      
    } catch (error) {
      setJoinview(null); // Handle error by setting joinview to null
    }
  };

  useEffect(() => {
    fetchJoinView(extid);
  }, [extid]);
  return (
    <>
      {joinview && joinview.role === "DELIVERY_BOY" && (
        <DeliveryboyView data={joinview} />
      )}
      {joinview && joinview.role === "ENTERPRISE" && (
        <EnterpriseView data={joinview} />
      )}
      {joinview && joinview.role === "CONSUMER" && (
        <ConsumerView data={joinview} />
      )}
    </>
  );
}

export default NewJoinRequestPage;
