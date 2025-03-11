"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession,signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      setIsLogin(true); // Show loading during redirect
      router.replace("/dashboard"); // Use replace to avoid browser history issues
    }
  }, [status, session, router]);

  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError("");
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.ok) {
        setLoading(false);
        router.push("/dashboard");
      } else {
        setLoading(false);
        const errorMessage =
          res?.status === 401
            ? "Invalid email or password. Please try again."
            : "An unexpected error occurred. Please try again later.";
        setError(errorMessage);
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

            <div className="mt-4 relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${formik.errors.password && formik.touched.password ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-2 text-center" aria-live="assertive">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
