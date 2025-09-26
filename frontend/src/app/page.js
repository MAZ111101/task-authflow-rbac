"use client";

import { useState } from "react";
import api from "../services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobile: "",
    profile_pic: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await api.post("/auth/register", form);
      setMessage(res.data.message || "Registered successfully");
      setTimeout(() => router.push(`/verify-otp?email=${form.email}`), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white shadow-lg rounded-2xl">
      {/* Header with login link */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Register</h2>
        <Link
          href="/login"
          className="text-indigo-600 hover:underline text-sm"
        >
          Already have an account? Login
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="px-4 py-2 border rounded-lg w-full"
          />
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="px-4 py-2 border rounded-lg w-full"
          />
        </div>

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile (optional)"
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          name="profile_pic"
          value={form.profile_pic}
          onChange={handleChange}
          placeholder="Profile Picture URL (optional)"
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
}
