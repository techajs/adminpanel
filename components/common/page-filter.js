import React,{ useState } from "react";
const PageFilter = ({ selectedOption, onPageChanges }) => {
  const changeTextColor = (e) => {
    onPageChanges(e);
  };
  return (
    <div>
      <label>
        Show
        <select
          value={selectedOption}
          onChange={changeTextColor}
          className="ml-2 border dark:bg-boxdark rounded px-2 py-1"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>{" "}
        entries
      </label>
    </div>
  );
};

export default PageFilter;
