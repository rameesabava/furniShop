import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function ProductDetails() {

  const { id } = useParams()
  const [product, setProduct] = useState()

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`)
      setProduct(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProduct()
  }, [id])

  if (!product) {
    return <div className="text-center mt-5">Loading...</div>
  }

  return (
    <div className="container-fluid py-5 bg-light">

      <div className="container">
        <div className="row align-items-center g-5">

          {/* Large Image Section */}
          <div className="col-lg-7 text-center">
            <div className="p-4 bg-white rounded-4 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid rounded-4"
                style={{
                  width: "100%",
                  maxHeight: "600px",
                  objectFit: "cover"
                }}
              />
            </div>
          </div>

          {/*  Details Section */}
          <div className="col-lg-5">

            <h1 className="fw-bold mb-3">{product.name}</h1>

            <h3 className="text-success mb-3">₹ {product.price}</h3>
                        <p className="mb-3">Fabric: {product.fabric}</p>

                        <p className="mb-3">Size: {product.size}</p>

            <p className="mb-4" style={{ lineHeight: "1.7" }}>
              {product.description ||
                "Experience premium quality and modern design. Built for comfort, durability, and style."}
            </p>

            {/* Buttons */}
            <div className="d-flex gap-3 mb-4">
              <Link to={`/order/${id}`} className="btn btn-dark px-4 py-2">
                Order Now
              </Link>

              <Link to="/products" className="btn btn-outline-secondary px-4 py-2">
                Back
              </Link>
            </div>

            

          </div>

        </div>
      </div>

    </div>
  )
}

export default ProductDetails