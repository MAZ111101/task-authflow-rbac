"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../../services/api";


export default function VerifyOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/verify-otp", { email, code });
      alert("Verified. Please login.");
      router.push("/user/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-2xl space-y-5"
    >
      <h2 className="text-2xl font-bold text-center">
        Verify OTP for {email}
      </h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </form>
  );
}
