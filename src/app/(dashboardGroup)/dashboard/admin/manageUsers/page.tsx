"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// types/user.ts
 interface TUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "moderator" | "admin";
}


export default function ManageUsers() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [search, setSearch] = useState("");

  // Fetch users
   const fetchUsers = () =>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`)
    .then(res => res.json())
    .then(data => setUsers(data))
  }
    
  useEffect(() => {
    fetchUsers();
  },[])
  

  // Search filter
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Update user role
  const updateRole = async (id: string, role: "moderator" | "admin") => {
    const confirmed = await Swal.fire({
      title: `Are you sure to make ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, make ${role}`,
    });

    if (confirmed.isConfirmed) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();

      if (data.modifiedCount) {
        Swal.fire("Updated!", `User is now a ${role}.`, "success");
        fetchUsers();
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-sm"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 text-right flex gap-2 justify-end">
                  {user.role !== "moderator" && (
                    <button
                      onClick={() => updateRole(user._id, "moderator")}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Make Moderator
                    </button>
                  )}
                  {user.role !== "admin" && (
                    <button
                      onClick={() => updateRole(user._id, "admin")}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
