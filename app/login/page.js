"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Waiting from "@/components/common/waiting";

// Define Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect to the callback URL or default dashboard if authenticated
      const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
      router.replace(callbackUrl); // Using replace to prevent going back to login
    }
  }, [status, router]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError("");
      setIsLogin(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.ok) {
        const callUrl=searchParams.get("callbackUrl")
        const callbackUrl = callUrl || "/dashboard";
        console.log("url",callUrl)
        setIsLogin(false);
        router.replace(callbackUrl); // Redirect on successful login
      } else {
        setIsLogin(false);
        setError(res?.status === 401 ? "Invalid email or password. Please try again." : `Login failed: ${res?.error || "Unknown error"}`);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center">
          <Link href="/">
            <div className="flex items-center justify-center gap-3 mb-5">
              <Image src="/images/logo/Logo-icon.png" alt="Logo" width={60} height={32} />
              <span className="text-3xl font-semibold text-gray-900 dark:text-white">Rapidmate</span>
            </div>
          </Link>
          <p className="text-gray-600 dark:text-gray-300">Welcome back! Please login to your account.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${formik.errors.email && formik.touched.email ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${formik.errors.password && formik.touched.password ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLogin}
            >
              {isLogin ? 'Logging in...' : 'Sign In'}
            </button>
          </div>
          {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
}
