"use client";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Sample package data
const packageData = [
  {
    name: "John Doe",
    email: "johndoe@email.com",
    joindate: "26-03-24",
  },
  {
    name: "Jane Smith",
    email: "janesmith@email.com",
    joindate: "15-02-24",
  },
  {
    name: "Alice Johnson",
    email: "alicejohnson@email.com",
    joindate: "01-01-24",
  },
];

const ConsumerUsers = () => {
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
  React.useEffect(() => {
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
                Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Join Date
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
                    {packageItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.email}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.joindate}
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
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.9188 12.1785 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M7.73133 13.889C7.84383 13.889 7.95633 13.8609 8.04633 13.7765L9.00258 12.8203L9.95883 13.7765C10.1038 13.9215 10.3513 13.9215 10.4963 13.7765C10.6413 13.6315 10.6413 13.384 10.4963 13.239L9.54008 12.2827L10.4963 11.3265C10.6413 11.1815 10.6413 10.934 10.4963 10.789C10.3513 10.644 10.1038 10.644 9.95883 10.789L9.00258 11.7453L8.04633 10.789C7.90133 10.644 7.65383 10.644 7.50883 10.789C7.36383 10.934 7.36383 11.1815 7.50883 11.3265L8.46508 12.2827L7.50883 13.239C7.36383 13.384 7.36383 13.6315 7.50883 13.7765C7.59883 13.8609 7.71133 13.889 7.73133 13.889Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      <i class="fa-solid fa-pen-to-square"></i>
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
              Download <span><i class="fa-solid fa-download"></i></span>
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete <span><i class="fa-solid fa-trash"></i></span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerUsers;
