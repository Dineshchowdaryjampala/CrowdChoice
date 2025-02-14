import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../../components/input/AuthInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full absolute animate-waves bg-gradient-to-r from-black via-gray-900 to-blue-900 opacity-50"></div>
      </div>
      <div className="absolute w-full h-full flex justify-center items-center">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-400 opacity-30 rounded-full"
            style={{
              width: `${Math.random() * 6}px`,
              height: `${Math.random() * 6}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 6 + 3}s ease-in-out infinite alternate`,
            }}
          ></div>
        ))}
      </div>
      <div className="relative w-full max-w-md p-8 bg-gray-900 bg-opacity-90 backdrop-blur-xl shadow-2xl rounded-xl border border-blue-500 border-opacity-50 animate-glow">
        <h3 className="text-3xl font-extrabold text-white text-center">Welcome Back</h3>
        <p className="text-sm text-gray-300 text-center mt-2 mb-6">Enter your credentials to log in.</p>
        <form onSubmit={handleLogin}>
          <AuthInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            type="text"
            className="text-white"
          />
          <AuthInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            className="text-white"
          />
          {error && <p className="text-red-400 text-xs pb-2.5">{error}</p>}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-700 py-3 text-white font-bold uppercase rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105 hover:shadow-blue-400/50"
          >
            LOGIN
          </button>
          <p className="text-sm text-gray-300 text-center mt-3">
            Don't have an account? {" "}
            <Link className="text-blue-300 underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <style>
        {`
          @keyframes waves {
            0% { transform: translateY(0); }
            50% { transform: translateY(20px); }
            100% { transform: translateY(0); }
          }
          @keyframes float {
            0% { transform: translateY(-20px); opacity: 0.4; }
            100% { transform: translateY(20px); opacity: 0.8; }
          }
          @keyframes glow {
            0% { box-shadow: 0 0 10px rgba(0, 0, 255, 0.2); }
            50% { box-shadow: 0 0 20px rgba(0, 0, 255, 0.5); }
            100% { box-shadow: 0 0 10px rgba(0, 0, 255, 0.2); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginForm;
