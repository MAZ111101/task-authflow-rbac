"use client";
import Header from "../../../components/Header";
import UserList from "../../../components/UserList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="max-w-5xl mt-4 mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

        {/* User list */}
        <div className="mb-8">
          <UserList />
        </div>

        {/* Placeholder for create/edit user forms */}
        <div className="mt-6">
          {/* You can add forms here for creating or editing users */}
        </div>
      </div>
    </div>
  );
}
