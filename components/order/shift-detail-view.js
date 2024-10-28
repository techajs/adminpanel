import Image from "next/image";
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";

const ShiftDetail = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="lg:w-2/3">
            <div className="border rounded-lg shadow-sm">
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4 dark:text-white text-black">
                  Schedule overview:
                </h4>
                <div className="flex justify-between space-x-8 mb-6">
                  <div>
                    <h2 className="text-3xl font-bold dark:text-white text-black">
                      20
                    </h2>
                    <p className=" dark:text-white text-black">
                      Total days
                    </p>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold dark:text-white text-black">
                      80
                    </h2>
                    <p className=" dark:text-white text-black">
                      Total Hours
                    </p>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold dark:text-white text-black">
                      €2.3k
                    </h2>
                    <p className=" dark:text-white text-black">
                      Aprox earning
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 dark:text-white text-black">
                  <p>
                    From <b>20-02-24, 10 AM</b>
                  </p>
                  <span>&rarr;</span>
                  <p>
                    To <b>10-03-24, 02 PM</b>
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-gray-100 p-2 rounded-bl-lg rounded-br-lg dark:bg-gray-700">
                <Link
                  href="/"
                  className="flex items-center justify-between text-blue-500 hover:underline dark:text-blue-400"
                >
                  <p className="dark:text-white text-black">See details</p>
                  <span className="text-lg dark:text-white text-black">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 lg:ml-6 mt-6 lg:mt-0">
            <div className="p-4 bg-white border rounded-lg shadow-sm flex items-center justify-between dark:bg-boxdark dark:border-strokedark">
              <div className="flex items-center">
                <Image
                  className="h-10 w-10 mr-3 rounded-full"
                  src={"/images/Requester.png"}
                  alt="Icon"
                  width={100}
                  height={100}
                />
                <div>
                  <h4 className="text-lg font-semibold dark:text-white text-black">
                    John Doe
                  </h4>
                  <p className=" dark:text-white text-black">
                    Île-de-France
                  </p>
                </div>
              </div>
              <p className="ml-auto text-right  dark:text-white text-black">
                Requester
              </p>
            </div>

            <div className="mt-4">
              <button
                className="w-full block text-center bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 dark:bg-blue-600"
              >
                Accept
              </button>
            </div>
            <div className="mt-4 flex space-x-4">
              <button className="w-full text-center border border-gray-400 py-2 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white text-black">
                Download
              </button>
              <button className="w-full text-center border border-red-500  py-2 rounded-lg hover:bg-red-100 dark:border-red-400 dark:hover:bg-red-700 dark:text-white text-black">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftDetail;
