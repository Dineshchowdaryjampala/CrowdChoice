import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import AuthInput from "../../components/input/AuthInput";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName || !validateEmail(email) || !username || !password) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        username,
        email,
        password,
        profileImageUrl,
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
      {/* Background Animated Waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full absolute animate-waves bg-gradient-to-r from-black via-gray-900 to-blue-900 opacity-50"></div>
      </div>

      {/* Floating Particle Effect */}
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

      {/* Sign-Up Form Box */}
      <div className="relative w-full max-w-md p-8 bg-gray-900 bg-opacity-90 backdrop-blur-xl shadow-2xl rounded-xl border border-blue-500 border-opacity-50 animate-glow">
        <h3 className="text-3xl font-extrabold text-white text-center">Create an Account</h3>
        <p className="text-sm text-gray-300 text-center mt-2 mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <AuthInput
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            type="text"
            className="text-white"
            labelClassName="text-blue-400" // Custom class for label

          />
          <AuthInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            type="text"
            className="text-white"
          />
          <AuthInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
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
            CREATE ACCOUNT
          </button>

          <p className="text-sm text-gray-300 text-center mt-3">
            Already have an account?{" "}
            <Link className="text-blue-300 underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Inline Animation Styles */}
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

export default SignUpForm;
