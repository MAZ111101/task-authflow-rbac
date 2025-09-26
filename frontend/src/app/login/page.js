"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      // Case 1: OTP required
      if (res.data.step === "otp_required") {
        alert("OTP sent to your email. Please verify.");
        router.push(`/verify-otp?email=${form.email}`);
        return;
      }
      // Case 2: OTP verified, tokens are returned
      if (res.data.access_token && res.data.user) {
        localStorage.setItem("access_token", res.data.access_token);
        const role = res.data.user.role;
        if (role === "superadmin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard"); // or wherever normal users should go
          }
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      const backendMsg = err.response?.data?.message || err.response?.data?.msg || "Login failed";
      alert(backendMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-2xl">
      {/* Header with link to Register */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Login</h2>
        <Link href="/" className="text-indigo-600 hover:underline text-sm">
          Don't have an account? Register
        </Link>
      </div>

      <form onSubmit={login} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
