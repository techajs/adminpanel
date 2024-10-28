"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LockScreen() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUnlock = (e) => {
    e.preventDefault();

    // Replace 'yourPassword' with the actual password you want to use
    const correctPassword = "yourPassword"; 

    if (password === correctPassword) {
      router.push("/dashboard"); // Redirect to the dashboard on success
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-8">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Lock Screen</h1>
        <p className="text-gray-600 mb-6">Please enter your password to unlock.</p>
        
        <form onSubmit={handleUnlock}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter password"
            />
          </div>
          
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}
