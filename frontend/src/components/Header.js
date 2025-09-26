"use client";
import { useRouter } from "next/navigation";
import api from "../services/api";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); // backend clears cookies
      localStorage.removeItem("access_token"); // clear token if stored
      router.push("/login"); // redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="w-full bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </header>
  );
}
