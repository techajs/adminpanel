const ConsumerInfos = ({ data }) => {
  return (
    <div className="p-7 bg-white shadow-lg rounded-lg dark:border-strokedark dark:bg-boxdark">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Full Name */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Full Name
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.first_name} {data?.last_name}
          </h5>
        </div>

        {/* Email */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Email
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.email}
          </h5>
        </div>

        {/* Phone */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Phone
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.phone}
          </h5>
        </div>
        {/* Country */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            Country
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.country}
          </h5>
        </div>

        {/* Department */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            State
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.state}
          </h5>
        </div>

        {/* City  */}
        <div className="col-span-1">
          <p className="text-sm font-regular text-black dark:text-white">
            City
          </p>
          <h5 className="text-lg font-semibold text-black dark:text-white">
            {data?.city}
          </h5>
        </div>
        
      </div>
    </div>
  );
};

export default ConsumerInfos;
