import React, { useEffect, useState, useRef } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Products() {

  const [products, setProducts] = useState([]);

  const cardRefs = useRef([]);
  const imageRefs = useRef([]);

  // 🔥 FETCH PRODUCTS
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // 🔥 SCROLL ANIMATION
  useEffect(() => {
    if (products.length > 0) {
      gsap.fromTo(
        cardRefs.current,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".product-grid",
            start: "top 80%",
          }
        }
      );
    }
  }, [products]);

  // 🔥 3D CARD HOVER
  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 10;
    const rotateY = (x - rect.width / 2) / 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out"
    });
  };

  // 🔥 IMAGE ZOOM (CURSOR BASED)
  const handleImageZoom = (e, index) => {
    const img = imageRefs.current[index];
    const rect = img.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    gsap.to(img, {
      transformOrigin: `${xPercent}% ${yPercent}%`,
      scale: 2,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const resetImageZoom = (index) => {
    const img = imageRefs.current[index];

    gsap.to(img, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out"
    });
  };

  return (
    <div>
      <div className="product-list">
        <h2 className="title">Our Products</h2>

        <div className="product-grid">
          {products.map((item, index) => (
            <div
              className="card"
              key={item.id}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >

              {/* 🔥 IMAGE ZOOM AREA */}
              <div
                className="image-container"
                onMouseMove={(e) => handleImageZoom(e, index)}
                onMouseLeave={() => resetImageZoom(index)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  ref={(el) => (imageRefs.current[index] = el)}
                />
              </div>

              <div className="card-body">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <div className="d-flex gap-2 justify-content-center">
                  <Link to={`/product/${item.id}`} className="view-btn">
                    View Details
                  </Link>

                  <Link to={`/order/${item.id}`} className="order-btn">
                    Order Now
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;