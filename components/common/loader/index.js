"use client";

import React, { useEffect, useState } from "react";

const Loader = ({children}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center bg-white dark:bg-black" style={{ height: '86.9vh' }}>
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      ) : (children)}
    </>
  );
};

export default Loader;
