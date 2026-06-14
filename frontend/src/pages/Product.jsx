import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/Product.css";
import Footer from "../components/Footer";
import heroImage from "../assets/hero.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  toast.error("Please Login First");
  return;
}
      await API.post("/cart", {
        user: user._id,
        product: productId,
        quantity: 1,
      });

      toast.success("Added to Cart 🛒");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) =>
  product.name
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <>
      <Navbar />

      <div className="hero">
  <div className="hero-content">
    <h1>HireSphere Store</h1>

    <p>
      Discover Premium Products
      At Amazing Prices
    </p>

    <button className="shop-btn">
      Shop Now
    </button>
  </div>

  <img
    src={heroImage}
    alt="Hero"
    className="hero-image"
  />
</div>
      <h1
        style={{
          color: "#2563eb",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Products
      </h1>

      <div className="product-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="product-card"
            style={{
              background: "#ffffff",
              borderRadius: "15px",
              padding: "20px",
              width: "280px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >

            <img
  src={product.image}
  alt={product.name}
/>
            <h3 
  >{product.name}</h3>

            <p>{product.description}</p>

            <h2>₹{product.price}</h2>

            <button
              onClick={() => addToCart(product._id)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
export default Product;
