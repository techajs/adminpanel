"use client";
import React, { useState } from "react";

const JoinRequestRejectionModal = ({ showModal, closeModal, reason, setReason, submitHandler }) => {
  if (!showModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (reason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }
    submitHandler(reason); // Pass the reason to the submit handler
    closeModal(); // Optionally close the modal after submitting
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full dark:border-strokedark dark:bg-boxdark"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Reason for rejection
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Please write the reason for the rejection
            </label>
            <textarea
              rows={6}
              value={reason}
              placeholder="Type here.."
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition mr-5"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinRequestRejectionModal;
