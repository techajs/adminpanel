import { GrFormSchedule } from "react-icons/gr";
import { FcAdvertising } from "react-icons/fc";
import { RiBattery2ChargeFill } from "react-icons/ri";
import { BsFillCreditCardFill } from "react-icons/bs";
import { FaCodePullRequest } from "react-icons/fa6";
import Link from "next/link";

const getIcon = (icon) => {
  switch (icon) {
    case "request":
      return <FaCodePullRequest size={30} />;
    case "schedule":
      return <GrFormSchedule size={33} />;
    case "advertising":
      return <FcAdvertising size={30} />;
    case "battery":
      return <RiBattery2ChargeFill size={30} />;
    case "credit-card":
      return <BsFillCreditCardFill size={30} />;
    default:
      return null;
  }
};
export default function Dashboarbox({ url,icon, title, subtitle }) {
  return (
    <Link href={`${url}`}>
      <div className="flex items-center p-4 border-stroke bg-white  shadow-md rounded-lg h-20 m-0  dark:border-strokedark dark:bg-boxdark">
        {getIcon(icon)}{" "}
        <div>
          <h4 className="text-md font-semibold text-black mb-0 dark:text-white ml-2">
            {title}
          </h4>
          {subtitle && (
            <p className="text-sm font-normal  mb-0 ml-2">{subtitle}</p>
          )}
        </div>
        <i className="fa-solid fa-arrow-right ml-auto text-gray-500"></i>
      </div>
    </Link>
  );
}
