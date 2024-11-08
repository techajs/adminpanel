"use client";
import { getValidImageUrl } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineClose, MdOutlineHideImage } from "react-icons/md";

const DocumentModal = ({ showModal, closeModal, url, docName, docStatus }) => {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full dark:border-strokedark dark:bg-boxdark"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className={`flex justify-end ${docStatus ? "mt-6" : "-mt-2"}`}>
          <Link href={"#"} onClick={closeModal} className="text-gray-900">
            <MdOutlineClose size={20} />
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">
          {docName} {docStatus}
        </h2>

        <div className="flex justify-center mt-4">
          {docStatus ? (
            <Image
              src={url}
              alt={docName}
              width={300}
              height={300}
              className="w-full h-auto object-contain"
            />
          ) : (
            <div className="h-48 w-full flex flex-col items-center justify-evenly bg-gray-200 rounded-lg text-gray-500 dark:bg-boxdark border">
              <MdOutlineHideImage size={50} />
              <span>No Image Available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;
