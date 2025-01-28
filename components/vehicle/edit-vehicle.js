"use client";
import Waiting from "@/components/common/waiting";
import useFetchGlobalData from "@/hooks/useFetchData";
import { updateVehicle } from "@/services";
import { uploadImage } from "@/services/common";
import { getValidImageUrl, useAuthToken } from "@/utils/constants";
import { vehicleValicationSchema } from "@/utils/schema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
const EditVehicle = ({ VehicleId,actionType }) => {
    const token = useAuthToken();
  
  const router = useRouter()
  const { vehicle, vehicleType,fetchVehicle} = useFetchGlobalData();
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [previews, setPreviews] = useState({
    reg_doc: null,
    driving_license: null,
    insurance: null,
    passport: null,
  });

  useEffect(() => {
    if (vehicle) {
        let foundVehicle={}
        if(actionType=='vehicle'){
           foundVehicle = vehicle.find((v) => String(v.id) === String(VehicleId));
        }else{
            foundVehicle = vehicle.find((v) => String(v.ext_id) === String(VehicleId));
        }
      
      if (foundVehicle) {
        setVehicleData(foundVehicle);
        setPreviews({
          reg_doc: foundVehicle.reg_doc || null,
          driving_license: foundVehicle.driving_license || null,
          insurance: foundVehicle.insurance || null,
          passport: foundVehicle.passport || null,
        });
      }else{
        fetchVehicle();
      }
      setLoading(false);
    }
  }, [VehicleId]);

  const formik = useFormik({
    initialValues: {
      delivery_boy_ext_id: vehicleData?.ext_id || "",
      vehicle_type: vehicleData?.vehicle_type_id || "",
      modal: vehicleData?.modal || "",
      make: vehicleData?.make || "",
      variant: vehicleData?.variant || "",
      plat_no: vehicleData?.plat_no || "",
      reg_doc: vehicleData?.reg_doc || null,
      driving_license: vehicleData?.driving_license || null,
      insurance: vehicleData?.insurance || null,
      passport: getValidImageUrl(vehicleData?.passport) || null,
    },
    enableReinitialize: true,
    validationSchema: vehicleValicationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let vehicleParams = {};
      // Check if text inputs have changed
      const hasInputChanged = (field) => values[field] !== vehicleData[field];

      // Check if file input has changed
      const hasFileChanged = (field) =>
        values[field] && values[field] !== vehicleData[field];

      // Handle text input changes
      if (hasInputChanged("delivery_boy_ext_id")) vehicleParams.delivery_boy_ext_id = values.delivery_boy_ext_id;
      if (hasInputChanged("vehicle_type")) vehicleParams.vehicle_type_id = values.vehicle_type;
      if (hasInputChanged("modal")) vehicleParams.modal = values.modal;
      if (hasInputChanged("make")) vehicleParams.make = values.make;
      if (hasInputChanged("variant")) vehicleParams.variant = values.variant;
      if (hasInputChanged("plat_no")) vehicleParams.plat_no = values.plat_no;

      try {
        // Upload document if file input has changed
        if (hasFileChanged("reg_doc")) {
          const regDocFormData = new FormData();
          regDocFormData.append("file", values.reg_doc);
          const regDocResponse = await uploadImage(regDocFormData,token)
          console.log("reg_doc",regDocResponse)
          vehicleParams.reg_doc = regDocResponse;
        }

        if (hasFileChanged("driving_license")) {
          const drivingLicenseFormData = new FormData();
          drivingLicenseFormData.append("file", values.driving_license);
          const drivingLicenseResponse = await uploadImage(drivingLicenseFormData,token)
          console.log("response => ",drivingLicenseResponse)
          vehicleParams.driving_license =drivingLicenseResponse;
        }

        if (hasFileChanged("insurance")) {
          const insuranceFormData = new FormData();
          insuranceFormData.append("file", values.insurance);
          const insuranceResponse = await uploadImage(insuranceFormData,token)
          console.log('insurance',insuranceResponse)
          vehicleParams.insurance = insuranceResponse;
        }
       
        vehicleParams.vehicleId = vehicleData?.id ;
        if (hasFileChanged("passport")) {
          const passportFormData = new FormData();
          passportFormData.append("file", values.passport);
          const passportResponse = await uploadImage(passportFormData)
          console.log("passport",passportResponse)
          vehicleParams.passport =passportResponse;
        }
        if (Object.keys(vehicleParams).length > 0) {
          const response = await updateVehicle(vehicleParams,token);
          setSuccessMessage(response)
        }
      } catch (error) {
        setError(error)
        console.log(error)
      } finally {
        setLoading(false);
        setTimeout(()=>{
          setError("");
          setSuccessMessage("");
          fetchVehicle();
          if(actionType=='vehicle'){
            router.replace("/vehicle");
          }
          
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
    <>
   
      <div className="p-10 mt-10 bg-white shadow-lg rounded-lg dark:border-strokedark dark:bg-boxdark relative">
        <div className="bg-black text-white p-2 px-4 rounded-md absolute -top-5">
          Vehicle Details
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Delivery Boy (Dropdown) */}

          <input
            type="hidden"
            name="delivery_boy_ext_id"
            placeholder="Enter Delivery Boy ID or Name"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary"
            value={formik.values.delivery_boy_ext_id}
            onChange={formik.handleChange}
          />
          {/* Vehicle Type (Dropdown) */}
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Vehicle Type
            </label>
            <select
              name="vehicle_type"
              value={formik.values.vehicle_type}
              onChange={(e) =>
                formik.setFieldValue("vehicle_type", e.target.value)
              }
              className="w-full  rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
            >
              <option value="">Select Vehicle Type</option>
              {vehicleType?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.vehicle_type} {/* Displaying the vehicle type name */}
                </option>
              ))}
            </select>
            {formik.errors.vehicle_type && formik.touched.vehicle_type && (
              <div className="text-red-500 text-sm">
                {formik.errors.vehicle_type}
              </div>
            )}
          </div>

          {/* Text fields */}
          {["modal", "make", "variant", "plat_no"].map((field) => (
            <div key={field}>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                placeholder={`Enter ${field}`}
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

          {/* File Uploads with Previews */}
          {["reg_doc", "driving_license", "insurance", "passport"].map(
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
          <div className="flex justify-center  space-x-5 col-span-full">
            {successMessage && <p className="text-success text-lg">{successMessage}</p>}
            {error && <p className="text-danger text-lg">{error.error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default EditVehicle;
