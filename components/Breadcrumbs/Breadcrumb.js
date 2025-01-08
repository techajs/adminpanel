"use client"
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
const Breadcrumb = ({ pageName, title }) => {
  const router = useRouter();
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-sm font-semibold text-black dark:text-white">
        <h2 className="text-sm font-semibold text-black dark:text-white">
          <div className="flex items-center gap-3">
            {title && (
              <button className="font-medium text-primary"onClick={() => router.back()}>
                <FaArrowLeft className="mr-2" size={20} />
              </button>
            )}
            {pageName}
          </div>
        </h2>
      </h2>

      <nav>
        <ol className="flex items-center gap-1 text-xs">
          <li>
            <Link className="font-medium text-primary" href="/dashboard">
              Dashboard
            </Link>
            {" /"}
          </li>
          {/* {title && (
            <li>
              <Link className="font-medium text-primary" href={`/${title}`}>
                {title}{" "}
              </Link>
              /
            </li>
          )} */}
          <li className="font-medium">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
