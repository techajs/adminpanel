import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ConsumerUsers from "@/components/consumer/user";
import LayoutPage from "@/components/Layouts/layout";
import Link from "next/link";

const Users = () => {
  return (
    <LayoutPage>
      <Breadcrumb pageName="Users" />
      <div className="flex justify-end mb-4">
        <Link href="/users/create/createuser">
          <p className="px-4 py-2 bg-blue-500 text-white rounded text-sm">
            <span>
              <i class="fa-solid fa-plus"></i>
            </span>{" "}
            Create User
          </p>
        </Link>
      </div>
      <div className="flex flex-col gap-10">
          <ConsumerUsers />
        </div>
    </LayoutPage>
  );
};

export default Users;
