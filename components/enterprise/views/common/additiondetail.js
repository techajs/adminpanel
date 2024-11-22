import React from "react";

const EnterpriseAdditionDetail = ({ order,vehicle }) => {
  if (order?.promo_code == null && Object.keys(vehicle || {}).length === 0 ) {
    return (
      <div className="space-y-2">
        <p className="ml-5 mt-5">Data not found.</p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {vehicle && (
        <>
          <p className="border-b-2 border-dotted border-gray-300 pb-2 flex items-center">
            <strong>Vehicle:</strong>
            <span className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
              {vehicle?.modal || "N/A"}
            </span>
          </p>
          <p className="border-b-2 border-dotted border-gray-300 pb-2 flex items-center">
            <strong>Vehicle Plat no:</strong>
            <span className="ml-2 flex items-center gap-1 px-2 py-1 border border-dotted border-gray-400 rounded">
              {vehicle?.plat_no}
            </span>
          </p>

          <p className="border-b-2 border-dotted border-gray-300 pb-2 flex items-center">
            <strong>Make :</strong> {vehicle?.make || "N/A"}
          </p>
        </>
      )}

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
        <strong>Discount Amount :</strong> {order?.discount?.toFixed(2) || "0"}{" "}
        €
      </p>
    </div>
  );
};

export default EnterpriseAdditionDetail;
