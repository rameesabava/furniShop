import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { Modal, Box, Typography, Button } from "@mui/material";
import { addOrderAPI, getProductAPI } from "../services/allProductsApiService";

function Order() {
  const { id } = useParams()

  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)

  const [user, setUser] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [orderData, setOrderData] = useState();
  const [open, setOpen] = useState(false);

  // fetch product
  const getProduct = async () => {
    if (id) {
      const result = await getProductAPI(id)
      setProduct(result.data)
    }
  }

  useEffect(() => {
    getProduct()
  }, [id])

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const totalPrice = product ? product.price * quantity : 0

  // place order
  const handleOrder = async () => {
    if (user.name && user.phone && user.address && quantity) {
      try {
        const data = {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: Number(quantity),
          totalPrice: totalPrice,
          customerName: user.name,
          phone: user.phone,
          address: user.address,
          date: new Date().toLocaleString()
        }
        const response = await addOrderAPI(data)

        setOrderData(response.data);
        alert("Order placed successfully!")

        setUser({ name: "", phone: "", address: "" })
        setQuantity(1)

      } catch (err) {
        console.log(err);
        alert("Order failed!!!")

      }
    } else {
      alert("Please fill the form completely!!!")
    }

  }

  // pdf download
  const downloadReceipt = () => {
    const doc = new jsPDF()

    const formatPrice = (value) => value.toLocaleString("en-IN")

    doc.setFontSize(18)
    doc.text("Order Receipt", 20, 20)

    doc.setFontSize(12)

    doc.text(`Product: ${orderData.productName}`, 20, 40)
    doc.text(`Price: Rs. ${formatPrice(orderData.price)}`, 20, 50)
    doc.text(`Quantity: ${orderData.quantity}`, 20, 60)
    doc.text(`Total: Rs. ${formatPrice(orderData.totalPrice)}`, 20, 70)

    doc.text(`Name: ${orderData.customerName}`, 20, 90)
    doc.text(`Phone: ${orderData.phone}`, 20, 100)
    doc.text(`Address: ${orderData.address}`, 20, 110)

    doc.text(`Date: ${orderData.date}`, 20, 130)

    doc.save(`${orderData.customerName}`)
  };

  // modal
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4
  };

  return (
    <div className="container py-5">
      <div className="row shadow-lg rounded-4 overflow-hidden">
        {/* image section */}
        <div className="col-md-6 bg-light d-flex align-items-center justify-content-center p-4">
          <img src={product?.image} alt="productImage" className="img-fluid rounded-4"
            style={{ maxHeight: "400px", objectFit: "cover" }} />
        </div>

        {/* form section */}
        <div className="col-md-6 p-5">
          <h2 className="mb-4 fw-bold">Place Your Order</h2>

          <input className="form-control mb-2" value={product?.name} readOnly />
          <input className="form-control mb-2" value={product?.id} readOnly />
          <input className="form-control mb-2" value={product?.price} readOnly />

          <input type="number" className="form-control mb-2" value={quantity} min="1"
            onChange={(e) => setQuantity(Number(e.target.value))} />

          <input className="form-control mb-3 fw-bold text-success" value={`Rs. ${totalPrice}`}
            readOnly />

          <input type="text" name="name" className="form-control mb-2" placeholder="Your Name" onChange={handleChange} />

          <input type="text" name="phone" className="form-control mb-2" placeholder="Phone"
            onChange={handleChange} />

          <textarea name="address" className="form-control mb-3" placeholder="Address"
            onChange={handleChange}></textarea>

          <button className="btn btn-dark w-100" onClick={handleOrder}>Confirm Order</button>

          <button className="btn btn-outline-dark w-100 mt-3" onClick={() => setOpen(true)} disabled={!orderData}>
            View Order Receipt
          </button>
        </div>
      </div>

      {/* modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>

          <Typography variant="h6" textAlign="center" mb={2}>
             Order Receipt
          </Typography>

          {orderData && (
            <>
              <Typography>Product: {orderData.productName}</Typography>
              <Typography>Price: Rs. {orderData.price.toLocaleString("en-IN")}</Typography>
              <Typography>Qty: {orderData.quantity}</Typography>
              <Typography>Total: Rs. {orderData.totalPrice.toLocaleString("en-IN")}</Typography>

              <hr />

              <Typography>Name: {orderData.customerName}</Typography>
              <Typography>Phone: {orderData.phone}</Typography>
              <Typography>Address: {orderData.address}</Typography>

              <Typography mt={1}>Date: {orderData.date}</Typography>

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={downloadReceipt}
              >
                Download PDF
              </Button>
            </>
          )}

        </Box>
      </Modal>

    </div>
  )
}

export default Order