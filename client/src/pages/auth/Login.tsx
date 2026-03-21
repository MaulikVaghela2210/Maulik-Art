import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleLogin = async (e:any) => {

    e.preventDefault();

    try {

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        { email,password }
      );

      // ⭐ TOKEN SAVE
      localStorage.setItem("token",data.token);

      // ⭐ USER OBJECT SAVE
      localStorage.setItem("user",JSON.stringify(data.user));

      // ⭐ EMAIL SEPARATE SAVE (ORDER KE LIYE)
      localStorage.setItem("userEmail",data.user.email);

      if(data.user.role === "admin"){
        navigate("/admin/dashboard");
      }else{
        navigate("/");
      }

    } catch (err:any) {

      setError(err.response?.data?.message || "Login failed");

    }

  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <input
          type="email"
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
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have account? 
          <Link
            to="/signup"
            className="text-blue-500 ml-1"
          >
            Signup
          </Link>
        </p>

      </form>

    </div>

  );

};

export default Login;