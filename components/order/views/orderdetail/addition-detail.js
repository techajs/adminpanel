import React from "react";

const AdditionDetail = ({ order }) => {
    
  if (order?.promo_code==null) {
    return (
      <div className="space-y-2">
        <p className="ml-5 mt-5">Data not found.</p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <p className="border-b-2 border-dotted border-gray-300 pb-2 flex items-center">
        <strong>Coupon code:</strong>
        <span className="ml-2 flex items-center gap-1 px-2 py-1 border border-dotted border-gray-400 rounded">
          {order?.promo_code}
        </span>
      </p>
      <p className="border-b-2 border-dotted border-gray-300 pb-2 flex items-center">
        <strong>Discount:</strong>
        <span className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
          {order?.promo_value || "Direct amount"}
        </span>
      </p>
      <p className="border-b-2 border-dotted border-gray-300 pb-2 flex items-center">
        <strong>Discount Amount :</strong> {order?.discount?.toFixed(2) || "0"} €
      </p>
    </div>
  );
};

export default AdditionDetail;
