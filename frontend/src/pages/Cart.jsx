import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";
import toast from "react-hot-toast";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await API.get(
        `/cart/${user._id}`
      );

      setCartItems(res.data.cartItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    navigate("/login");
    return;
  }

  fetchCart();
}, []);

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await API.post("/orders", {
        user: user._id,

        products: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),

        totalAmount,
      });

      toast.success("Order Placed Successfully 🎉");

      toast.success("🎉 Order placed successfully!");
navigate("/orders");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Place Order");
    }
  };

  const removeItem = async (cartId) => {
    try {
      await API.delete(`/cart/${cartId}`);

      toast.success("Item Removed ❌");

      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Remove Item");
    }
  };

  return (
    <>
      <Navbar />

      <div>
        <h1 className="cart-title">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <h2
            style={{
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            Your Cart Is Empty 🛒
          </h2>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="cart-card"
              >
                <img
                  src={
                    item.product.image ||
                    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                  }
                  alt={item.product.name}
                  className="cart-image"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9";
                  }}
                />

                <div className="cart-details">
                  <h3>{item.product.name}</h3>

                  <p>
                    Price: ₹
                    {item.product.price}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <h2 className="cart-total">
              Total: ₹{totalAmount}
            </h2>

            <button
              className="place-order-btn"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;