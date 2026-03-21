import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignup = async (e:any) => {

    e.preventDefault();

    await axios.post(
      "http://https://${import.meta.env.VITE_API_URL}/api/users/register",
      { name,email,password }
    );

    alert("Account created");

    navigate("/login");

  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Signup
        </h2>

        <input
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black text-white p-3 rounded"
        >
          Signup
        </button>

      </form>

    </div>

  );
};

export default Signup;