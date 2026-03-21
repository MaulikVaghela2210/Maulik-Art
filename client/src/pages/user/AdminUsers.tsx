import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  createdAt: string;
}

const AdminUsers = () => {

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://maulik-art.onrender.com/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(res.data);

    } catch (error) {

      console.log("User fetch error", error);

    }

  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // DELETE USER
  const deleteUser = async (id: string) => {

    const confirm = window.confirm("Delete this user?");

    if (!confirm) return;

    const token = localStorage.getItem("token");

    await axios.delete(
      "https://maulik-art.onrender.com/api/users/${id}",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchUsers();

  };

  return (

    <div className="p-8">

      <h2 className="text-2xl font-bold mb-6">
        Users Management
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-200 rounded">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Joined</th>
              <th className="p-3 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-3 flex items-center gap-3">

                  <img
                    src={user.image}
                    className="w-10 h-10 rounded-full"
                  />

                  {user.name}

                </td>

                <td className="p-3">
                  {user.email}
                </td>

                <td className="p-3">

                  <span className={`px-2 py-1 rounded text-sm ${
                    user.role === "admin"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                  }`}>

                    {user.role}

                  </span>

                </td>

                <td className="p-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3 flex gap-2 justify-center">

                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AdminUsers;