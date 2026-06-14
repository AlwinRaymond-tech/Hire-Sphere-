import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await API.get(
        `/orders/${user._id}`
      );

      setOrders(res.data.orders);
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

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div className="orders-container">
        <h1 className="orders-title">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <h2 className="no-orders">
            No Orders Found
          </h2>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="order-card"
            >
              <h3>
                Order ID: {order._id}
              </h3>

              <p>
                Status:
                <span className="status">
                  {" "}
                  {order.status}
                </span>
              </p>

              <p>
                Total: ₹
                {order.totalAmount}
              </p>

              <p>
                Ordered On:{" "}
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Orders;