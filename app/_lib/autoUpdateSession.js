"use client"
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

const AutoSessionUpdate = (userData) => {
  const { data: session, update } = useSession();
  useEffect(() => {
    if (!session || !update) return;
    const fetchAndUpdate = async () => {
     if (session && session.webToken !== userData?.token) {
        update({webToken: userData.token }).then((updatedSession) =>console.log("token updated"))
        .catch((error) => console.error("Error updating session:", error));
      }
    };

    fetchAndUpdate(); // Auto-refresh session when data is fetched
  }, [userData]);

  return null;
};

export default AutoSessionUpdate;
