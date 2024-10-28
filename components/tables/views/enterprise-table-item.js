import { formatDate } from "@/utils/constants";
import Link from "next/link";
import { FaEye, FaFile, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const EnterpriseTableItem = ({ data, url, selected, handleCheckboxChange }) => {
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
              <h5 className="font-medium text-sm text-primary">
                <Link href={`${url}/${item.ext_id}`}>
                  {item.first_name} {item.last_name}
                </Link>
              </h5>
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
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark text-center">
              <p
                className={`inline-flex rounded-full bg-opacity-10 px-2 py-2 dark:text-white text-sm font-medium bg-boxdark `}
              >
                <Link href={`${url}/document/${item.ext_id}`}>
                  <FaFile size={15} />
                </Link>
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black text-sm dark:text-white">
                {formatDate(item.created_on)}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black text-sm dark:text-white">Scooter</p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black text-sm dark:text-white">Mini</p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black text-sm dark:text-white">1</p>
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
                <p
                  className={`inline-flex rounded-full bg-opacity-full px-2 py-2 text-white text-sm font-medium bg-danger `}
                >
                  <Link href={`${url}/${item.ext_id}`}>
                    <FaRegTrashAlt size={15} />
                  </Link>
                </p>
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
