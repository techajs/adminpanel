"use client";
import { getValidedImageUrl } from "@/utils/constants";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import DocumentModal from "./document-modal";
import { ValidationError } from "yup";
import { MdOutlineHideImage } from "react-icons/md";

const DocumentBaseTable = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [docName, setDocName] = useState("");
  const [docStatus, setDocStatus] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  // Open modal with selected document
  const openModal = (url, doc_name, status) => {
    setShowModal(true);
    setSelectedImage(url);
    setDocName(doc_name);
    setDocStatus(status);
  };

  // Close modal
  const closeModal = () => setShowModal(false);

  // Fetch all document images
  useEffect(() => {
    const fetchImageUrls = async () => {
      const updatedData = await Promise.all(
        data.map(async (doc) => {
          const getRes = await getValidedImageUrl(doc.imageUrl);
          return { ...doc, imageUrl: getRes.url, status: getRes.status }; // Add the valid image URL to the document
        })
      );
      setImageUrls(updatedData); // Set the data with valid URLs
    };

    if (data?.length) {
      fetchImageUrls();
    }
  }, [data]); // Re-fetch if `data` changes

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Documents</h1>

      {/* Grid Layout for Documents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {imageUrls.map((doc) => (
          <div
            key={doc.id}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer dark:bg-boxdark"
            onClick={() => openModal(doc.imageUrl, doc?.name, doc.status)}
          >
            {doc.status ? (
              <Image
                src={doc.imageUrl}
                alt={doc.name}
                width={100}
                height={100}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="h-48 w-full flex flex-col items-center justify-evenly bg-gray-200 rounded-lg text-gray-500 dark:bg-boxdark border">
                <MdOutlineHideImage size={50} />
                <span>No Image Available</span>
              </div>
            )}
            <div className="p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{doc.name}</h2>
              <FaEye size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Enlarged Image */}
      <DocumentModal
        showModal={showModal}
        closeModal={closeModal}
        url={selectedImage}
        docName={docName}
        docStatus={docStatus}
      />
    </div>
  );
};

export default DocumentBaseTable;
