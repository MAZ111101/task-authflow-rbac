// src/components/UserForm.js
"use client";
import { useState, useEffect } from "react";

export default function UserForm({ initial = null, onCancel, onSaved }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobile: "",
    role: "user",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        first_name: initial.first_name || "",
        last_name: initial.last_name || "",
        email: initial.email || "",
        password: "",
        mobile: initial.mobile || "",
        role: initial.role || "user",
      });
    }
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaved(form);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">{initial ? "Edit User" : "Create User"}</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input required placeholder="First name" value={form.first_name} onChange={(e)=>setForm({...form, first_name:e.target.value})} className="w-full px-3 py-2 border rounded"/>
        <input required placeholder="Last name" value={form.last_name} onChange={(e)=>setForm({...form, last_name:e.target.value})} className="w-full px-3 py-2 border rounded"/>
        <input required type="email" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} className="w-full px-3 py-2 border rounded"/>
        {!initial && <input required type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} className="w-full px-3 py-2 border rounded"/>}
        <input placeholder="Mobile" value={form.mobile} onChange={(e)=>setForm({...form, mobile:e.target.value})} className="w-full px-3 py-2 border rounded"/>
        <select value={form.role} onChange={(e)=>setForm({...form, role:e.target.value})} className="w-full px-3 py-2 border rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{initial ? "Save" : "Create"}</button>
        </div>
      </form>
    </div>
  );
}
