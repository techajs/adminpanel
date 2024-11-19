"use client";

import React, { useState, useEffect } from "react";

import DeliveryboyView from "./view/delivery-boy-view";
import { GetDetail } from "@/services/joinrequest/join";
import EnterpriseView from "./view/enterprise-view";
import ConsumerView from "./view/consumer-view";


function NewJoinRequestPage({extId}) {
  const [joinview, setJoinview] = useState(null); // Initialized to null to handle empty state
  const [extid,setExtid]=useState(extId)
  const fetchJoinView = async (ext_id) => {
    try {
      const response = await GetDetail(ext_id);
      setJoinview(response[0]);
    } catch (error) {
      setJoinview(null); // Handle error by setting joinview to null
    }
  };

  useEffect(() => {
    fetchJoinView(extid);
  }, [extid]);
  console.log(joinview)
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
