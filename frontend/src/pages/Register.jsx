import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/Register.css";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Account Created 🎉");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed ❌");
    }
  };

  return (
    <>
  <Navbar />
  <div className="register-container">
    <div className="register-card">
      <h1>Create Account </h1>

      <input
        className="register-input"
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        className="register-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        className="register-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        className="register-btn"
        onClick={registerUser}
      >
        Register
      </button>
    </div>
  </div>
</>

  );
  }

export default Register;