import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const Add = ({ title,url }) => {
  return (
    <div className="flex flex-wrap gap-5 xl:gap-7.5">
      <Link
        href={url}
        className="inline-flex items-center justify-center gap-1 rounded-md bg-meta-3 py-1   text-center font-medium text-white hover:bg-opacity-90 lg:px-3 xl:px-3"
      >
        <span>
          <FaPlus />
        </span>
        {title}
      </Link>
    </div>
  );
};

export default Add;
