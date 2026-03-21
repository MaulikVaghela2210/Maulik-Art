import { useEffect, useState } from "react";
import axios from "axios";

import {
FaFacebook,
FaTwitter,
FaInstagram,
FaLinkedin
} from "react-icons/fa";

interface Artist {
  _id: string;
  name: string;
  role: string;
  desc: string;
  img: string;

  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

const AdminArtists = () => {

  const [artists, setArtists] = useState<Artist[]>([]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [desc, setDesc] = useState("");

  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchArtists = async () => {

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/artists`
    );

    setArtists(res.data);

  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const resetForm = () => {

    setName("");
    setRole("");
    setDesc("");

    setFacebook("");
    setTwitter("");
    setInstagram("");
    setLinkedin("");

    setImage(null);
    setEditingId(null);

  };

  const addOrUpdateArtist = async () => {

    const formData = new FormData();

    formData.append("name", name);
    formData.append("role", role);
    formData.append("desc", desc);

    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("instagram", instagram);
    formData.append("linkedin", linkedin);

    if (image) {
      formData.append("image", image);
    }

    if (editingId) {

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/artists/${editingId}`,
        formData
      );

    } else {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/artists`,
        formData
      );

    }

    resetForm();
    fetchArtists();

  };

  const deleteArtist = async (id: string) => {

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/artists/${id}`
    );

    fetchArtists();

  };

  const editArtist = (artist: Artist) => {

    setEditingId(artist._id);

    setName(artist.name);
    setRole(artist.role);
    setDesc(artist.desc);

    setFacebook(artist.social?.facebook || "");
    setTwitter(artist.social?.twitter || "");
    setInstagram(artist.social?.instagram || "");
    setLinkedin(artist.social?.linkedin || "");

  };

  return (

    <div className="p-10">

      <h2 className="text-3xl font-bold mb-8">
        Artists Management
      </h2>

      {/* FORM */}

      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h3 className="text-lg font-semibold mb-6">
          {editingId ? "Edit Artist" : "Add Artist"}
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Artist Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Role"
            className="border p-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            type="file"
            className="border p-2 rounded col-span-2"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
          />

          <textarea
            placeholder="Description"
            className="border p-2 rounded col-span-2"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          {/* SOCIAL INPUTS */}

          <div className="flex items-center border p-2 rounded">
            <FaFacebook className="text-blue-600 mr-2"/>
            <input
              placeholder="Facebook Link"
              className="outline-none w-full"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>

          <div className="flex items-center border p-2 rounded">
            <FaTwitter className="text-blue-400 mr-2"/>
            <input
              placeholder="Twitter Link"
              className="outline-none w-full"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>

          <div className="flex items-center border p-2 rounded">
            <FaInstagram className="text-pink-500 mr-2"/>
            <input
              placeholder="Instagram Link"
              className="outline-none w-full"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>

          <div className="flex items-center border p-2 rounded">
            <FaLinkedin className="text-blue-700 mr-2"/>
            <input
              placeholder="Linkedin Link"
              className="outline-none w-full"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>

          <button
            onClick={addOrUpdateArtist}
            className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
          >
            {editingId ? "Update Artist" : "Add Artist"}
          </button>

        </div>

      </div>

      {/* TABLE */}

      <table className="w-full bg-white shadow rounded-lg">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Role</th>
            <th className="p-4">Social</th>
            <th className="p-4">Action</th>

          </tr>

        </thead>

        <tbody>

          {artists.map((artist) => (

            <tr key={artist._id} className="border-t text-center">

              <td className="p-4">

                <img
                  src={artist.img}
                  className="w-14 h-14 rounded-full mx-auto object-cover border"
                />

              </td>

              <td className="p-4">{artist.name}</td>

              <td className="p-4">{artist.role}</td>

              <td className="p-4 text-lg">

            <div className="flex justify-center items-center gap-3">

                {artist.social?.facebook && (
                <a href={artist.social.facebook} target="_blank">
                    <FaFacebook className="text-blue-600"/>
                </a>
                )}

                {artist.social?.twitter && (
                <a href={artist.social.twitter} target="_blank">
                    <FaTwitter className="text-blue-400"/>
                </a>
                )}

                {artist.social?.instagram && (
                <a href={artist.social.instagram} target="_blank">
                    <FaInstagram className="text-pink-500"/>
                </a>
                )}

                {artist.social?.linkedin && (
                <a href={artist.social.linkedin} target="_blank">
                    <FaLinkedin className="text-blue-700"/>
                </a>
                )}

            </div>

            </td>

              <td className="p-4 space-x-2">

                <button
                  onClick={() => editArtist(artist)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteArtist(artist._id)}
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

  );

};

export default AdminArtists;