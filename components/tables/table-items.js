import { headers } from "@/utils/constants";
import Link from "next/link";
import { FaEye, FaFile, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import DeliveryboyTableItem from "./views/deliveryboy-table-item";
import EnterpriseTableItem from "./views/enterprise-table-item";
import ConsumerTableItem from "./views/consumer-table-item";
import VehicleTableItem from "./views/vehicle-table-item";
import VehicleTypeTableItem from "./views/vehicle-type-table-item";

const TableItem = ({
  data,
  url,
  selectAll,
  handleSelectAllChange,
  selected,
  handleCheckboxChange,
  refreshData,
}) => {
  const TableItemComponents = {
    deliveryboy: DeliveryboyTableItem,
    consumer: ConsumerTableItem,
    enterprise: EnterpriseTableItem,
    vehicle: VehicleTableItem,
    vehicletype: VehicleTypeTableItem,
  };

  const TableItemComponent = TableItemComponents[url.replace("/", "")];
  const tableHeaders = headers[url.replace("/", "")] || [];
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          {url?.replace("/", "") !== "vehicle" &&
            url?.replace("/", "") !== "vehicletype" && (
              <th className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
            )}

          {tableHeaders.map((header, index) => (
            <th
              key={index}
              className="px-4 py-4 font-medium text-black dark:text-white"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TableItemComponent ? (
          <TableItemComponent
            data={data}
            url={url}
            refreshData={refreshData}
            selected={selected}
            handleCheckboxChange={handleCheckboxChange}
          />
        ) : (
          <tr>
            <td colSpan="10" className="px-4 py-4 text-center text-gray-500">
              No matching table item component found for the specified URL.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableItem;
