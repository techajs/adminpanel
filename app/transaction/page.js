"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LayoutPage from "@/components/Layouts/layout";
import { useEffect, useState } from "react";

const packageData = [
    {
      user: "John Doe",
      amount: "€34.00",
      date: "13-Jul-2024",
    },
    {
      user: "John Doe",
      amount: "€34.00",
      date: "13-Jul-2024",
    },
    {
      user: "John Doe",
      amount: "€34.00",
      date: "13-Jul-2024",
    },
  ];
const TransactionPage = () => {
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
  
    // Function to handle individual checkbox change
    const handleCheckboxChange = (index) => {
      setSelected((prevSelected) => {
        if (prevSelected.includes(index)) {
          return prevSelected.filter((i) => i !== index);
        } else {
          return [...prevSelected, index];
        }
      });
    };
  
    // Function to handle "select all" checkbox change
    const handleSelectAllChange = () => {
      if (selectAll) {
        setSelected([]); // Unselect all
      } else {
        setSelected(packageData.map((_, index) => index)); // Select all
      }
      setSelectAll(!selectAll);
    };
  
    // Sync selectAll checkbox with individual checkboxes
    useEffect(() => {
      if (selected.length === packageData.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
    }, [selected]);
  
    // Handle delete action
    const handleDelete = () => {
      const remainingUsers = packageData.filter(
        (_, index) => !selected.includes(index)
      );
      console.log(
        "Deleted users:",
        selected.map((i) => packageData[i])
      );
      console.log("Remaining users:", remainingUsers);
    };
  
    // Handle download action
    const handleDownload = () => {
      const selectedUsers = selected.map((i) => packageData[i]);
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(selectedUsers));
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "selected_users.json");
      document.body.appendChild(downloadAnchorNode); // Required for Firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    };
  return (
    <LayoutPage>
      <Breadcrumb pageName={`Transaction List`} />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                User
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Amount
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <input
                    type="checkbox"
                    checked={selected.includes(key)}
                    onChange={() => handleCheckboxChange(key)}
                  />
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.user}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.amount}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.date}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conditionally render selected user count and buttons */}
      {selected.length > 0 && (
        <div className="flex justify-between items-center mt-4 mb-4">
          <div>
            <p className="text-black font-medium dark:text-white">
              Selected Users: {selected.length}
            </p>
          </div>
          <div className="space-x-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Download{" "}
              <span>
                <i class="fa-solid fa-download"></i>
              </span>
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete{" "}
              <span>
                <i class="fa-solid fa-trash"></i>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
    </LayoutPage>
  );
};

export default TransactionPage;
