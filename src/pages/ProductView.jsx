import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProductAPI } from '../services/allProductsApiService';

gsap.registerPlugin(ScrollTrigger);

function ProductView() {

  const { id } = useParams()
  const [product, setProduct] = useState()

  const imageRef = useRef(null)
  const textRef = useRef(null)

  const getProduct = async () => {
    if (id) {
      const result = await getProductAPI(id)
      setProduct(result.data)
    }
  }

  useEffect(() => {
    getProduct()
  }, [id])

  // animation
  useEffect(() => {
    if (product) {

      // image animation
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      )

      // text
      gsap.fromTo(
        textRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.3
        }
      )
    }
  }, [product])

  // image hover animation
  const handleMouseMove = (e) => {
    const img = imageRef.current
    const rect = img.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateX = -(y - rect.height / 2) / 20
    const rotateY = (x - rect.width / 2) / 20

    gsap.to(img, {
      scale: 1.05,
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleMouseLeave = () => {
    const img = imageRef.current

    gsap.to(img, {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out"
    })
  }

  return (
    <div className="container-fluid py-5 bg-light">

      <div className="container">
        <div className="row align-items-center g-5">

          {/* image section */}
          <div className="col-lg-7 text-center">
            <div className="p-4 bg-white rounded-4 shadow-sm"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: "1000px" }}
            >
              <img ref={imageRef} src={product?.image} alt={product?.name} className="img-fluid rounded-4" style={{width: "100%", maxHeight: "600px", objectFit: "cover"}}/>
            </div>
          </div>

          {/* details section */}
          <div className="col-lg-5" ref={textRef}>

            <h1 className="fw-bold mb-3">{product?.name}</h1>

            <h3 className="text-success mb-3">₹ {product?.price}</h3>

            <p className="mb-2">Fabric: {product?.fabric}</p>
            <p className="mb-2">Size: {product?.size}</p>

            <p className="mb-4" style={{ lineHeight: "1.7" }}>
              {product?.description}
            </p>

            {/* buttons */}
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

export default ProductView