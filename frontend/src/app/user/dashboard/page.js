"use client";

import Header from "../../../components/Header";

export default function HomePage() {
  // Dummy user data for display; replace with actual API call in real scenario
  const user = {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    role: "user",
    created_by: "Super Admin",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome, {user.first_name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's your dashboard overview.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-gray-500">Full Name</span>
              <span className="font-medium text-gray-900">{user.first_name} {user.last_name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-900">{user.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">Role</span>
              <span className="font-medium text-gray-900 capitalize">{user.role}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">Created By</span>
              <span className="font-medium text-gray-900">{user.created_by}</span>
            </div>
          </div>
        </div>

        {/* Stats or other cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-indigo-600 text-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Tasks</h3>
            <p className="mt-2 text-2xl font-bold">12</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Projects</h3>
            <p className="mt-2 text-2xl font-bold">5</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Messages</h3>
            <p className="mt-2 text-2xl font-bold">8</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <p className="mt-2 text-2xl font-bold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
