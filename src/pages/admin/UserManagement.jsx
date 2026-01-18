import React, { useEffect, useState } from "react";
import { Edit, Trash2, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logoutUser } from "../../redux/slices/authSlice";
import axiosInstance from "../../api/axiosInstance";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);

  const isSuperAdmin = loggedInUser?.role === "superadmin";

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/useroutes/allUser");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= UPDATE ROLE ================= */
  const handleRoleChange = async (userId, newRole) => {
    if (!isSuperAdmin) return;

    if (!window.confirm("Change user role?")) return;

    try {
      const res = await axiosInstance.put("/useroutes/update-role", {
        userId,
        role: newRole,
      });

      fetchUsers();

      // 🔄 sync redux if superadmin updates self (rare case)
      if (loggedInUser?._id === userId) {
        dispatch(setUser(res.data.updatedUser));
      }
    } catch (err) {
      alert("Failed to update role");
    }
  };

  /* ================= DELETE USER ================= */
  const deleteUser = async (userId) => {
    if (!isSuperAdmin) return;

    if (
      !window.confirm(
        "This action is permanent.\nAre you sure you want to delete this user?"
      )
    )
      return;

    try {
      await axiosInstance.delete(`/useroutes/delete-user/${userId}`);
      fetchUsers();

      if (loggedInUser?._id === userId) {
        dispatch(logoutUser());
      }
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6 text-gray-900 pb-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Users size={22} /> User Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage user roles, access levels, and accounts
          </p>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
          <table className="min-w-[700px] w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr className="text-gray-600">
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Mobile</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    {/* USER */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 flex items-center gap-2">
                        {u.name}

                        {u.role === "superadmin" && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                            Super Admin
                          </span>
                        )}

                        {loggedInUser?._id === u._id && (
                          <span className="text-xs text-blue-600">(You)</span>
                        )}
                      </p>
                    </td>

                    {/* MOBILE */}
                    <td className="px-6 py-4 text-gray-700">
                      {u.mobile}
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4">
                      {u.role === "superadmin" ? (
                        <span className="text-sm font-medium text-purple-700">
                          Super Admin
                        </span>
                      ) : (
                        <select
                          value={u.role}
                          disabled={!isSuperAdmin}
                          onChange={(e) =>
                            handleRoleChange(u._id, e.target.value)
                          }
                          className={`
                            px-3 py-2 rounded-md border text-sm bg-white
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${!isSuperAdmin ? "opacity-60 cursor-not-allowed" : ""}
                          `}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">

                        {/* EDIT (future use) */}
                        <button
                          title="Edit user"
                          disabled
                          className="
                            p-2 rounded-md bg-gray-100 text-gray-400
                            cursor-not-allowed
                          "
                        >
                          <Edit size={16} />
                        </button>

                        {/* DELETE (superadmin only & not superadmin row) */}
                        {isSuperAdmin && u.role !== "superadmin" && (
                          <button
                            title="Delete user"
                            onClick={() => deleteUser(u._id)}
                            className="
                              p-2 rounded-md bg-red-50 text-red-600
                              hover:bg-red-100
                            "
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER INFO */}
        <p className="text-xs text-gray-500 mt-4">
          ⚠ Only Super Admin can change roles or delete users.
        </p>
      </div>
    </div>
  );
};

export default UserManagement;
