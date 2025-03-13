"use client";
import Switcher from "@/components/common/switcher";
import Waiting from "@/components/common/waiting";
import { updateEnterprise } from "@/server/enterprise";
import { formatDate, getValidImageUrl } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaFile, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const EnterpriseTableItem = ({
  data,
  url,
  refreshData,
  selected,
  handleCheckboxChange,
}) => {
  const [matchId, setMatchId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading,setLoading]=useState(false)
  const statusChange = async (value, Id) => {
    setLoading(true);
    setMatchId(Id);
    const payload = {
      ext_id: Id,
      isPaylater: 1,
      isPay:value ? 1 : 0,
    };
    try {
      const response = await updateEnterprise(payload);
      setSuccessMsg(response?.message || "updated")
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
              <input
                type="checkbox"
                checked={selected.includes(key)}
                onChange={() => handleCheckboxChange(key)}
              />
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <div className="flex items-center gap-2">
                <div className="bg-green-500 w-12 h-12 rounded-full flex  justify-center">
                  {item.profile_pic ? (
                    <Image
                      src={`${getValidImageUrl(item.profile_pic)}`}
                      alt={`${data.first_name || "N/A"} ${
                        data.last_name || ""
                      }`}
                      className="w-full h-full rounded-full object-cover"
                      width={60}
                      height={60}
                    />
                  ) : (
                    <span className="text-2xl text-white font-bold">
                      {item.first_name
                        ? item.first_name.charAt(0).toUpperCase()
                        : "U"}
                    </span>
                  )}
                </div>
                <h5 className="font-medium text-sm text-primary">
                  <Link href={`${url}/${item.ext_id}`}>
                    {item.first_name} {item.last_name}
                  </Link>
                </h5>
              </div>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black text-sm dark:text-white">{item.email}</p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p
                className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium bg-success text-success`}
              >
                {item.phone}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black text-sm dark:text-white">
                {item?.industry_type}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black text-sm dark:text-white">
                {item?.company_name}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p
                className={`${
                  item?.is_active === 2
                    ? "flex justify-start items-center gap-2"
                    : ""
                } text-center rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                  item?.is_active === 1
                    ? "bg-success text-success"
                    : item?.is_active === 0
                    ? "bg-warning text-warning" // Style for waiting for approval
                    : "bg-danger text-danger"
                }`}
              >
                {item?.is_active === 1 ? (
                  "Accepted"
                ) : item?.is_active === 0 ? (
                  <Link href={`/joinrequest/${item.ext_id}`}>
                    Waiting for Approval
                  </Link>
                ) : (
                  <>
                    <span>Rejected </span>
                    <Link href={`/joinrequest/${item.ext_id}`}>
                      <FaEye size={15} />
                    </Link>
                  </>
                )}
              </p>
            </td>

            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black text-sm dark:text-white">
                {formatDate(item.created_on)}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            {matchId === item.id && loading ? (
                <Waiting />
              ) : (
                <Switcher
                  enabledValue={item.is_pay_later == 0 ? false : true}
                  valueId={item?.ext_id}
                  onChange={statusChange}
                />
              )}
            </td>

            <td className="border-b text-left border-[#eee] px-4 py-5 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 px-2 py-2 dark:text-white text-sm font-medium bg-boxdark `}
                >
                  <Link href={`${url}/${item.ext_id}`}>
                    <FaEye size={15} />
                  </Link>
                </p>
                <p
                  className={`inline-flex rounded-full bg-opacity-70 px-2 py-2 text-white text-sm font-medium bg-success `}
                >
                  <Link href={`${url}/${item.ext_id}/edit`}>
                    <FaRegEdit size={15} />
                  </Link>
                </p>
                {/* <p
                  className={`inline-flex rounded-full bg-opacity-full px-2 py-2 text-white text-sm font-medium bg-danger `}
                >
                  <Link href={`${url}/${item.ext_id}`}>
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

export default EnterpriseTableItem;
