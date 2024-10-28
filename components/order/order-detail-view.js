import Image from "next/image";
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const OrderDetailView = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="w-full">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex rounded-lg p-5 shadow-md mb-5 dark:text-white">
                <Image
                  className="h-8 w-9 mr-3"
                  src="/images/Package-Up.png"
                  alt="Icon"
                  width={100}
                  height={100}
                />
                <div>
                  <p className="text-sm font-medium mb-0 dark:text-white text-black">
                    Pickup information
                  </p>
                  <h4 className="text-lg font-semibold mb-0 dark:text-white text-black">
                    Company Name
                  </h4>
                  <p className="text-sm font-medium  mb-0 dark:text-white text-black">
                    22 Rue de la Liberté, Paris, Île-de-France.
                  </p>
                </div>
              </div>

              <div className="flex items-center rounded-lg p-3 shadow-md mb-4 dark:text-white">
                <Image
                  className="h-10 w-10 mr-3 rounded-full"
                  src="/images/Requester.png"
                  alt="Icon"
                  width={100}
                  height={100}
                />
                <div>
                  <h4 className="text-base font-semibold mb-0 dark:text-white text-black">
                    John Doe
                  </h4>
                  <p className="text-sm font-normal mb-0 dark:text-white text-black">
                    Île-de-France
                  </p>
                </div>
                <p className="ml-auto text-sm font-semibold  dark:text-white text-black">
                  Requester
                </p>
              </div>

              <div className="rounded-lg p-3 shadow-md mb-4 dark:text-white">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium dark:text-white text-black">
                      Order fare
                    </p>
                    <p className="text-sm font-normal dark:text-white text-black">
                      Travelled 12 km in 32 mins
                    </p>
                  </div>
                  <h4 className="text-lg font-semibold  dark:text-white text-black">
                    €34.00
                  </h4>
                </div>

                <div className="flex justify-between my-1 dark:text-white">
                  <p className="text-sm font-normal dark:text-white text-black">
                    Order fare
                  </p>
                  <p className="text-sm font-bold dark:text-white text-black">
                    €30.00
                  </p>
                </div>

                <div className="flex justify-between my-1 dark:text-white">
                  <p className="text-sm font-normal dark:text-white text-black">
                    Waiting
                  </p>
                  <p className="text-sm font-bold dark:text-white text-black">
                    €03.00
                  </p>
                </div>

                <div className="flex justify-between my-1 dark:text-white">
                  <p className="text-sm font-normal dark:text-white text-black">
                    Platform fee
                  </p>
                  <p className="text-sm font-bold dark:text-white text-black">
                    €01.00
                  </p>
                </div>

                <div className="flex justify-between my-1 dark:text-white">
                  <p className="text-sm font-normal dark:text-white text-black">
                    Amount charged
                  </p>
                  <p className="text-sm font-bold dark:text-white text-black">
                    €34.00
                  </p>
                </div>

                <div className="flex items-center mt-2 dark:text-white">
                  <Image
                    className="h-4 w-7 mr-3"
                    src="/images/logos_mastercard.png"
                    alt="Icon"
                    width={100}
                    height={100}
                  />
                  <p className="text-sm font-normal dark:text-white text-black">
                    Paid with mastercard
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex rounded-lg p-5 shadow-md mb-5 dark:text-white">
                <Image
                  className="h-8 w-9 mr-3"
                  src="/images/Package-Down.png"
                  alt="Icon"
                  width={100}
                  height={100}
                />
                <div>
                  <p className="text-sm font-medium mb-0 dark:text-white text-black">
                    Drop off information
                  </p>
                  <h4 className="text-lg font-semibold mb-0 dark:text-white text-black">
                    Company Name
                  </h4>
                  <p className="text-sm font-medium  mb-0 dark:text-white text-black">
                    22 Rue de la Liberté, Paris, Île-de-France.
                  </p>
                </div>
              </div>

              <div className="flex items-center rounded-lg p-3 shadow-md mb-4 dark:text-white">
                <Image
                  className="h-10 w-10 mr-3 rounded-full"
                  src="/images/Deliveryboy.jpeg"
                  alt="Icon"
                  width={100}
                  height={100}
                />
                <div>
                  <h4 className="text-base font-semibold mb-0 dark:text-white text-black">
                    Mike Anthony
                  </h4>
                  <p className="text-sm font-normal mb-0 dark:text-white text-black">
                    Mini Truck
                  </p>
                </div>
                <p className="ml-auto text-sm font-semibold  dark:text-white text-black">
                  Delivery boy
                </p>
              </div>

              <div className="rounded-lg p-3 shadow-md mb-4 dark:text-white">
                <p className="text-sm font-semibold mb-2 dark:text-white text-black">
                  Package information
                </p>
                <p className="text-sm font-normal mb-2 dark:text-white text-black">
                  Order ID: <b className="dark:text-white text-black">20394</b>
                </p>
                <p className="text-sm font-normal mb-2 dark:text-white text-black">
                  Comments:{" "}
                  <b className="dark:text-white text-black">
                    Lorem ipsum dolor sit amet conse ctetur. Ridiculus nunc
                    platea sed.
                  </b>
                </p>
                <p className="text-sm font-normal mb-2 dark:text-white text-black">
                  Vehicle:{" "}
                  <b className="dark:text-white text-black">Pickup truck</b>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mb-4 mt-5">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Download <span><i class="fa-solid fa-download"></i></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailView;
