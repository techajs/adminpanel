import Switcher from "@/components/common/switcher";
import Waiting from "@/components/common/waiting";
import { UdateVehicleTypeStatus } from "@/services";
import { getValidImageUrl } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaFile, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const VehicleTypeTableItem = ({ data, url, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const [matchId, setMatchId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const statusChange = async (value, Id) => {
    setLoading(true);
    setMatchId(Id);
    const payload = {
      status: value ? 0 : 1,
    };
    try {
      const response = await UdateVehicleTypeStatus(payload, Id);
      setSuccessMsg(response);
      refreshData();
    } catch (err) {
      if (err[0]?._errors) {
        console.log(err[0]._errors.message);
      } else {
        console.log(err);
      }
      // console.log(err)
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {data.length > 0 ? (
        data.map((item, key) => (
          <tr key={key}>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-primary text-sm">
                <Link href={`${url}/${item.id}`}>{item.vehicle_type}</Link>
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex flex-col">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center">
                  {item.pis ? (
                    <Image
                      src={getValidImageUrl(item.pic).url}
                      alt={`${data.vehicle_type || item.vehicle_type} ${
                        data.last_name || ""
                      }`}
                      className="w-full h-full rounded-full object-cover"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <span className="text-2xl text-white font-bold">
                      {item.vehicle_type
                        ? item.vehicle_type.charAt(0).toUpperCase()
                        : "U"}
                    </span>
                  )}
                </div>
              </div>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black text-sm dark:text-white">
                {item?.base_price}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black text-sm dark:text-white">
                {item?.km_price?.toFixed(2)}
              </p>
            </td>

            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black text-sm dark:text-white">
                {item?.vehicle_type_desc || "N/A"}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              {matchId === item.id && loading ? (
                <Waiting />
              ) : (
                <Switcher
                  enabledValue={item.is_del == 0 ? true : false}
                  valueId={item?.id}
                  onChange={statusChange}
                />
              )}
            </td>
            <td className="border-b text-left border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
              <p
                  className={`inline-flex rounded-full bg-opacity-10 px-2 py-2 dark:text-white text-sm font-medium bg-boxdark `}
                >
                  <Link href={`${url}/${item.id}`}>
                    <FaEye size={15} />
                  </Link>
                </p>
                <p
                  className={`inline-flex rounded-full bg-opacity-70 px-2 py-2 text-white text-sm font-medium bg-success `}
                >
                  <Link href={`${url}/${item.id}/edit`}>
                    <FaRegEdit size={15} />
                  </Link>
                </p>
                {/* <p
                  className={`inline-flex rounded-full bg-opacity-full px-2 py-2 text-white text-sm font-medium bg-danger `}
                >
                  <Link href="#">
                    <FaRegTrashAlt size={15} />
                  </Link>
                </p> */}
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="9" className="text-center py-5">
            Data not found
          </td>
        </tr>
      )}
    </>
  );
};

export default VehicleTypeTableItem;
