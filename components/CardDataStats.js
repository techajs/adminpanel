import React from "react";

const CardDataStats = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between items-center">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {children}
        </div>
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <i class="fa-solid fa-circle-info"></i>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
      </div>
    </div>
  );
};

export default CardDataStats;
