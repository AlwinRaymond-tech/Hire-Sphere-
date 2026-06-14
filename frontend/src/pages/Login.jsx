import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success(`Welcome ${res.data.user.name}! 👋`);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password ❌");
    }
  };

  return (
    <>
      <Navbar />

<div className="login-container">
  <div className="login-card">
    <h1>Welcome Back</h1>
    <span className="wave">👋</span>

    <input
      className="login-input"
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
    />

    <input
      className="login-input"
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    <button
      className="login-btn"
    onClick={loginUser}
    >
      Login
    </button>
  </div>
</div>
    </>
  );
}

export default Login;