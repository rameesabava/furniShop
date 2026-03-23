import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function OrderPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [user, setUser] = useState({
    name: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (!product) return <h2 className="text-center mt-5">Loading...</h2>;

  const totalPrice = product.price * quantity;

  const handleOrder = async () => {
  try {
    const orderData = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: Number(quantity),
      totalPrice: totalPrice,
      customerName: user.name,
      phone: user.phone,
      address: user.address,
      date: new Date().toLocaleString()
    };

    await axios.post("http://localhost:3000/orders", orderData);

    alert("✅ Order placed successfully!");

    // Optional: reset form
    setUser({ name: "", phone: "", address: "" });
    setQuantity(1);

  } catch (err) {
    console.log(err);
    alert("❌ Failed to place order");
  }
};

  return (
    <div className="container py-5">
      <div className="row shadow-lg rounded-4 overflow-hidden">

        {/* LEFT - Product Preview */}
        <div className="col-md-6 bg-light d-flex align-items-center justify-content-center p-4">
          <img
            src={product.image}
            alt=""
            className="img-fluid rounded-4"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>

        {/* RIGHT - Order Form */}
        <div className="col-md-6 p-5">
          <h2 className="mb-4 fw-bold">Place Your Order</h2>

          {/* Product Info */}
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input type="text" className="form-control" value={product.name} readOnly />
          </div>

          <div className="mb-3">
            <label className="form-label">Product ID</label>
            <input type="text" className="form-control" value={product.id} readOnly />
          </div>

          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input type="text" className="form-control" value={product.price} readOnly />
          </div>

          {/* Quantity */}
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Total Price */}
          <div className="mb-4">
            <label className="form-label">Total Price (₹)</label>
            <input
              type="text"
              className="form-control fw-bold text-success"
              value={totalPrice}
              readOnly
            />
          </div>

          {/* User Details */}
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter phone number"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Delivery Address</label>
            <textarea
              name="address"
              className="form-control"
              rows="3"
              placeholder="Enter delivery address"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Order Button */}
          <button 
  className="btn btn-dark w-100 py-2 rounded-3"
  onClick={handleOrder}
>
  Confirm Order
</button>
          <button className="btn btn-dark w-100 py-2 rounded-3 mt-3">
            View Order Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;