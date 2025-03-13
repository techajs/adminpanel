import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/styles.css";
export const metadata = {
  title: "Rapidmate Admin",
  description: "rapidmate admin panel",
};
import { GlobalDataProvider } from "./context/GlobalDataContext";
import AuthProvider from "@/components/authProvider";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <GlobalDataProvider>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {children}
            </div>
          </GlobalDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
