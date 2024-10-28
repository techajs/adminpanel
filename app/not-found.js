
import LayoutPage from "@/components/Layouts/layout";
import Image from "next/image";

export default function NotFound() {
  return (
    <LayoutPage>
      <div className="min-h-[535px] flex flex-col items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
        <div className="flex flex-col items-center">
          <Image
            src="/images/logo/Logo-icon.png"
            alt="404 Error"
            width={60}
            height={60}
            className="mb-4"
          />
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl mb-6">Oops! Page Not Found</p>
        </div>
      </div>
    </LayoutPage>
  );
}
