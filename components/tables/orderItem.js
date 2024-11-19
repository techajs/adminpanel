import { getStatus } from "@/utils/constants";
import Link from "next/link";
import { FaEye, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
const OrderTableItem = ({
    data,
    url,
  }) =>{
    return (
        <>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className=" px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Order Number
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Order Type
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  customer
                </th>
                
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Delivery boy
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  vehicles
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((item, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-sm text-black dark:text-white">
                        <Link href={`/order/${item.order_number}`} className="text-primary"> {item.order_number}</Link>
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-sm text-black dark:text-white">
                        {item.service_name}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black text-sm dark:text-white">
                        {item.consumername}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p
                        className={`text-black text-sm dark:text-white`}
                      >
                        {item.deliveryboyname || 'not assign'}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black text-sm dark:text-white">
                        {item.vehiclename}
                      </p>
                    </td>
                   
                    <td className="h-[100px] border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium bg-success text-success">
                        {getStatus(item.order_status)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Link
                          href={`${url}/${item.order_number}`}
                          className="hover:text-primary bg-gray-200 dark:bg-boxdark p-2 rounded-full"
                        >
                          <FaEye  size={17}/>
                        </Link>
                        
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
            </tbody>
          </table>
        </>
      );
}
export default OrderTableItem