
import Image from "next/image";
import Link from "next/link";

export default function AdminLandingPage() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 p-8">
      {/* Admin Panel Heading */}
      <div className="flex flex-col items-center bg-white p-10 rounded-lg shadow-lg">
        <Image
          src="/images/logo/Logo-icon.png"
          alt="Rapidmate Admin"
          width={80}
          height={80}
        />
        <h1 className="text-4xl font-bold text-gray-800 mt-6">
          Rapidmate
        </h1>
        <p className="text-gray-600 mt-4 text-center">
          Manage users, orders, and settings easily from the Rapidmate admin panel.
        </p>

        {/* Button to Login */}
        <Link
          href={"/dashboard"}
          className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
