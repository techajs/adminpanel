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
       <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.firebaseConfig = {
                apiKey: "${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}",
                authDomain: "${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}",
                projectId: "${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}",
                storageBucket: "${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}",
                messagingSenderId: "${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}",
                appId: "${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}",
              };
            `,
          }}
        />
      </head>
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
