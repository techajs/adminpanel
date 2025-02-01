"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LayoutPage from "@/components/Layouts/layout";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { vehicleTypeValidationSchema } from "@/utils/schema";
import Waiting from "@/components/common/waiting";
import useFetchGlobalData from "@/hooks/useFetchData";
import { updateVehicleType } from "@/services";
import { uploadImage } from "@/services/common";

 // Ensure path is correct

const EditVehicleType = ({ params, vehicleTypes }) => {
  const router = useRouter();
  const vehicleTypeId = params?.id || null;
  const [loading, setLoading] = useState(false);
  const {vehicleType,fetchVehicleType} = useFetchGlobalData()
  const [vehicleTypeData,setVehicleTypeData] = useState(null)
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [previews, setPreviews] = useState({
    pic: null,
  });
  
  useEffect(() => {
    if (vehicleType) {
      const foundVehicleType = vehicleType.find(
        (v) => String(v.id) === String(params.id)
      );
      if (foundVehicleType) {
        console.log(vehicleTypeId)
        setVehicleTypeData(foundVehicleType);
        
      }
      setLoading(false);
    }
  }, [vehicleType]);
  // Formik configuration
  const formik = useFormik({
    initialValues: {
      vehicle_type: vehicleTypeData?.vehicle_type || "",
      vehicle_type_desc: vehicleTypeData?.vehicle_type_desc || "",
      base_price: vehicleTypeData?.base_price || "",
      km_price: vehicleTypeData?.km_price?.toFixed(2) || "",
      percent: vehicleTypeData?.percent?.toFixed(2) || "",
      percent_calc: vehicleTypeData?.percent_calc?.toFixed(2) ||"",
      length:vehicleTypeData?.length || "",
      height:vehicleTypeData?.height || "",
      width: vehicleTypeData?.width || "",
      is_base_price: parseInt(vehicleTypeData?.is_base_price) || 0,
      commission_percentage: vehicleTypeData?.commission_percentage?.toFixed(2) || 0.00,
      enterprise_commission_percentage: vehicleTypeData?.enterprise_commission_percentage?.toFixed(2) || 0.00,
      waiting_fare: vehicleTypeData?.waiting_fare?.toFixed(2) || 0.00,
      enterprise_waiting_fare: vehicleTypeData?.enterprise_waiting_fare?.toFixed(2) || 0.00,
      pic:vehicleTypeData?.pic || "",
    },
    enableReinitialize: true,
    validationSchema: vehicleTypeValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let vehicleTypeParams={
        vehicle_type: values?.vehicle_type ,
        vehicle_type_desc: values?.vehicle_type_desc ,
        base_price: values?.base_price ,
        km_price: values?.km_price,
        percent: values?.percent,
        percent_calc: values?.percent_calc,
        length:values?.length ,
        height:values?.height ,
        width: values?.width ,
        is_base_price: values?.is_base_price,
        commission_percentage: values?.commission_percentage,
        enterprise_commission_percentage: values?.enterprise_commission_percentage,
        waiting_fare: values?.waiting_fare,
        enterprise_waiting_fare: values?.enterprise_waiting_fare,
      };
      const hasFileChanged = (field) =>values[field] && values[field] !== vehicleTypeData[field];
     
      if (hasFileChanged("pic")) {
        const picFormData = new FormData();
        picFormData.append("file", values.pic);
        const picResponse = await uploadImage(picFormData)
        vehicleTypeParams.pic =picResponse;
      }
      try {
        if (Object.keys(vehicleTypeParams).length > 0) {
            const response = await updateVehicleType(vehicleTypeParams,vehicleTypeId);
            console.log(vehicleTypeParams)
            setSuccessMessage(response)
        }
      } catch (error) {
        setError("An error occurred while updating vehicle type.");
      } finally {
        setLoading(false);
        setTimeout(()=>{
            setError("");
            setSuccessMessage("");
            fetchVehicleType();
            router.replace("/vehicletype");
          },2500)
      }
    },
  });
  
  const handleFileChange = (event, fieldName) => {
    const file = event.currentTarget.files[0];

    if (file) {
      // Set Formik value with the file
      formik.setFieldValue(fieldName, file);

      // Create a file preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({
          ...prev,
          [fieldName]: reader.result,
        }));
      };
      reader.readAsDataURL(file); // Convert file to base64 and update preview
    }
  };
  return (
    <LayoutPage>
      <Breadcrumb pageName="Edit Vehicle Type" title="vehicletype" />
      <div className="p-10 mt-10 bg-white shadow-lg rounded-lg dark:border-strokedark dark:bg-boxdark relative">
        <div className="bg-black text-white p-2 px-4 rounded-md absolute -top-5">
          Vehicle Type
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
        
          {/* Additional fields based on schema */}
          {["vehicle_type","vehicle_type_desc", "base_price", "km_price", "percent", "percent_calc", "length", "height", "width", "is_base_price", "commission_percentage", "enterprise_commission_percentage", "waiting_fare", "enterprise_waiting_fare"].map((field) => (
            <div key={field}>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {field.replace(/_/g, " ").replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())}
              </label>
              <input
                type={["base_price", "km_price", "percent", "percent_calc", "is_base_price", "commission_percentage", "enterprise_commission_percentage", "waiting_fare", "enterprise_waiting_fare"].includes(field) ? "number" : "text"}
                name={field}
                placeholder={`Enter ${field.replace(/_/g, " ")}`}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:text-white"
                value={formik.values[field]}
                onChange={formik.handleChange}
              />
              {formik.errors[field] && formik.touched[field] && (
                <div className="text-red-500 text-sm">
                  {formik.errors[field]}
                </div>
              )}
            </div>
          ))}

          {/* File Upload for Picture */}
          {["pic"].map(
            (fileField) => (
              <div key={fileField}>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  {fileField.charAt(0).toUpperCase() + fileField.slice(1)}
                </label>
                <input
                  type="file"
                  name={fileField}
                  onChange={(e) => handleFileChange(e, fileField)} // Call handleFileChange
                  className="w-full"
                />
                {previews[fileField] && (
                  <div className="mt-2">
                    <img
                      src={previews[fileField]} // Display preview image if available
                      alt={`${fileField} preview`}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            )
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-10 space-x-5 col-span-full">
            {loading ? (
              <Waiting />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
            )}
          </div>

          {/* Success/Error Messages */}
          <div className="flex justify-center space-x-5 col-span-full">
            {successMessage && (
              <p className="text-success text-lg">{successMessage}</p>
            )}
            {error && <p className="text-danger text-lg">{error}</p>}
          </div>
        </form>
      </div>
    </LayoutPage>
  );
};

export default EditVehicleType;
