import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import jsPDF from "jspdf"
import { Modal, Box, Typography, Button } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { addOrderAPI, getProductAPI } from "../services/allProductsApiService"

function Order() {
  const { id } = useParams();

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [orderData, setOrderData] = useState(null)
  const [open, setOpen] = useState(false)

  // validation
  const validationSchema = Yup.object({
    name: Yup.string()
     .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
      .min(3, "Minimum 3 characters")
      .required("Name is required"),

    phone: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit phone number")
      .required("Phone is required"),

    address: Yup.string()
    .matches(/^[A-Za-z0-9\s,./-]+$/, "Invalid address format")
      .min(10, "Address too short")
      .max(150, "Address too long")
      .required("Address is required")
  })

  // fetching products
  const getProduct = async () => {
    try {
      if (id) {
        const result = await getProductAPI(id);
        setProduct(result.data);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to load product");
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const totalPrice = product ? product.price * quantity : 0;

  // formik
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: ""
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!product) return alert("Product not loaded!");

      try {
        const data = {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity,
          totalPrice,
          customerName: values.name,
          phone: values.phone,
          address: values.address,
          date: new Date().toLocaleString()
        };

        const response = await addOrderAPI(data);

        setOrderData(response.data);
        alert("Order placed successfully!");

        resetForm();
        setQuantity(1);

      } catch (err) {
        console.log(err);
        alert("Order failed!");
      }
    }
  });

  // pdf
  const downloadReceipt = () => {
    if (!orderData) return;

    const doc = new jsPDF();

    const formatPrice = (value) => value.toLocaleString("en-IN");

    doc.setFontSize(18);
    doc.text("Order Receipt", 20, 20);

    doc.setFontSize(12);

    doc.text(`Product: ${orderData.productName}`, 20, 40);
    doc.text(`Price: Rs. ${formatPrice(orderData.price)}`, 20, 50);
    doc.text(`Quantity: ${orderData.quantity}`, 20, 60);
    doc.text(`Total: Rs. ${formatPrice(orderData.totalPrice)}`, 20, 70);

    doc.text(`Name: ${orderData.customerName}`, 20, 90);
    doc.text(`Phone: ${orderData.phone}`, 20, 100);
    doc.text(`Address: ${orderData.address}`, 20, 110);

    doc.text(`Date: ${orderData.date}`, 20, 130);

    doc.save(`Receipt_${orderData.customerName}.pdf`);
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

      {!product ? (
        <h4 className="text-center">Loading product...</h4>
      ) : (
        <div className="row shadow-lg rounded-4 overflow-hidden">

          {/* IMAGE */}
          <div className="col-md-6 bg-light d-flex align-items-center justify-content-center p-4">
            <img
              src={product.image}
              alt="product"
              className="img-fluid rounded-4"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>

          {/* FORM */}
          <div className="col-md-6 p-5">
            <h2 className="mb-4 fw-bold">Place Your Order</h2>

            <input className="form-control mb-2" value={product.name} readOnly />
            <input className="form-control mb-2" value={product.id} readOnly />
            <input className="form-control mb-2" value={product.price} readOnly />

            <input
              type="number"
              className="form-control mb-2"
              value={quantity}
              min="1"
              onChange={(e) =>
                setQuantity(Math.max(1, Number(e.target.value)))
              }
            />

            <input
              className="form-control mb-3 fw-bold text-success"
              value={`Rs. ${totalPrice.toLocaleString("en-IN")}`}
              readOnly
            />

            {/* NAME */}
            <input
              type="text"
              name="name"
              className={`form-control mb-1 ${
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
              placeholder="Your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <small className="text-danger">{formik.errors.name}</small>
            )}

            {/* PHONE */}
            <input
              type="text"
              name="phone"
              className={`form-control mb-1 ${
                formik.touched.phone && formik.errors.phone ? "is-invalid" : ""
              }`}
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <small className="text-danger">{formik.errors.phone}</small>
            )}

            {/* ADDRESS */}
            <textarea
              name="address"
              className={`form-control mb-1 ${
                formik.touched.address && formik.errors.address ? "is-invalid" : ""
              }`}
              placeholder="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.address && formik.errors.address && (
              <small className="text-danger">{formik.errors.address}</small>
            )}

            <button
              className="btn btn-dark w-100 mt-3"
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || !formik.dirty}
            >
              Confirm Order
            </button>

            <button
              className="btn btn-outline-dark w-100 mt-3"
              onClick={() => setOpen(true)}
              disabled={!orderData}
            >
              View Order Receipt
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" textAlign="center" mb={2}>
            Order Receipt
          </Typography>

          {orderData && (
            <>
              <Typography>Product: {orderData.productName}</Typography>
              <Typography>
                Price: Rs. {orderData.price.toLocaleString("en-IN")}
              </Typography>
              <Typography>Qty: {orderData.quantity}</Typography>
              <Typography>
                Total: Rs. {orderData.totalPrice.toLocaleString("en-IN")}
              </Typography>

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
  );
}

export default Order;