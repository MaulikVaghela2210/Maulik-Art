import { useEffect, useState } from "react";
import axios from "axios";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const AdminContacts = () => {

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const fetchContacts = async () => {

    const res = await axios.get("https://maulik-art.onrender.com/api/contacts");

    setContacts(res.data);

  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id: string) => {

    await axios.delete("https://maulik-art.onrender.com/api/contacts/${id}");

    fetchContacts();

  };

  const updateContact = async () => {

    if (!editingContact) return;

    await axios.put(
      "https://maulik-art.onrender.com/api/contacts/${editingContact._id}",
      editingContact
    );

    setEditingContact(null);

    fetchContacts();

  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Contact Messages
      </h1>

      <div className="bg-white shadow-xl rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-left">

            <tr className="text-gray-700">

              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Message</th>
              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {contacts.map((c) => (

              <tr
                key={c._id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="p-4">{c.name}</td>
                <td className="p-4">{c.email}</td>
                <td className="p-4">{c.phone}</td>
                <td className="p-4 max-w-xs truncate">
                  {c.message}
                </td>

                <td className="p-4 flex justify-center gap-3">

                  <button
                    onClick={() => setEditingContact(c)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteContact(c._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* ================= EDIT MODAL ================= */}

      {editingContact && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white rounded-xl p-8 w-[400px] space-y-4">

            <h2 className="text-xl font-bold">
              Edit Contact
            </h2>

            <input
              value={editingContact.name}
              onChange={(e) =>
                setEditingContact({
                  ...editingContact,
                  name: e.target.value,
                })
              }
              className="border p-2 rounded w-full"
            />

            <input
              value={editingContact.email}
              onChange={(e) =>
                setEditingContact({
                  ...editingContact,
                  email: e.target.value,
                })
              }
              className="border p-2 rounded w-full"
            />

            <input
              value={editingContact.phone}
              onChange={(e) =>
                setEditingContact({
                  ...editingContact,
                  phone: e.target.value,
                })
              }
              className="border p-2 rounded w-full"
            />

            <textarea
              value={editingContact.message}
              onChange={(e) =>
                setEditingContact({
                  ...editingContact,
                  message: e.target.value,
                })
              }
              className="border p-2 rounded w-full"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setEditingContact(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateContact}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Update
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminContacts;