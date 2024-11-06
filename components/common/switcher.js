"use client";
import { useState } from "react";

const Switcher = ({ enabledValue, valueId, onChange }) => {
  const [enabled, setEnabled] = useState(enabledValue || false);

  const changeHandler = (enable) => {
    onChange(enable, valueId);
    setEnabled(enable);
  };

  return (
    <div x-data="{ switcherToggle: false }">
      <label
        htmlFor={`toggle-${valueId}`}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            id={`toggle-${valueId}`} // Make the ID unique
            type="checkbox"
            className="sr-only"
            checked={enabled}
            onChange={() => changeHandler(!enabled)}
          />
          <div className={`h-6 w-12 rounded-full ${enabled ? 'bg-success' : 'bg-red'} shadow-inner`}></div>
          <div
            className={`dot absolute -top-0 left-0 h-6 w-6 rounded-full bg-white shadow-switch-1 transition ${
              enabled && "!right-0 !translate-x-full !bg-white dark:!bg-white"
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default Switcher;
