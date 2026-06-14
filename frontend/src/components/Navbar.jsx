import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import heroImage from "../assets/hero.png";

function Navbar() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

   return (
  <nav className="navbar">
    <Link to="/" className="logo-container">
      <img src="/img.png" alt="HireSphere Logo" className="logo" />
      <h1>HireSphere Store</h1>
    </Link>

    <div className="nav-links">
      <Link to="/">Products</Link>

      {user && (
        <>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
        </>
      )}
    </div>

    {user ? (
      <div className="user-section">
        <span>👋 {user.name}</span>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    ) : (
      <div className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    )}
  </nav>
);

}

export default Navbar;
