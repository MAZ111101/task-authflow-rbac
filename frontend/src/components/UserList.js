// src/components/UserList.js
"use client";
import { useEffect, useState } from "react";
import api from "../services/api";
import UserForm from "./UserForm";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // user being edited
  const [showCreate, setShowCreate] = useState(false);

  useEffect(()=>{ fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data || []);
      setError("");
    } catch (err) {
      console.error("fetchUsers err:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally { setLoading(false); }
  };

  const handleCreate = async (payload) => {
    try {
      await api.post("/admin/users", payload);
      setShowCreate(false);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  const handleEdit = async (payload) => {
    try {
      await api.put(`/admin/users/${editing.id}`, payload);
      setEditing(null);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Users</h3>
        <button onClick={()=>setShowCreate(true)} className="px-4 py-2 bg-green-600 text-white rounded">Create User</button>
      </div>

      <ul className="space-y-3">
        {users.map(u => (
          <li key={u.id} className="flex items-center justify-between bg-white rounded-md p-3 shadow-sm">
            <div>
              <div className="font-medium">{u.first_name} {u.last_name} <span className="text-sm text-gray-500">({u.role})</span></div>
              <div className="text-sm text-gray-600">{u.email} • {u.mobile || "—"}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setEditing(u)} className="px-3 py-1 border rounded">Edit</button>
              <button onClick={()=>handleDelete(u.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <UserForm onCancel={()=>setShowCreate(false)} onSaved={handleCreate} />
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <UserForm initial={editing} onCancel={()=>setEditing(null)} onSaved={handleEdit} />
        </div>
      )}
    </div>
  );
}
