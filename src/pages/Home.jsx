import React, { useRef, useEffect } from 'react'
import Slider from "react-slick";
import '../App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {

  const sliderRef = useRef(null);
  const contentRefs = useRef([]);
  const categoryRefs = useRef([]);

  useEffect(() => {

    // ▶️ First Load Animation
    animateSlide(0);

    // ▶️ Categories Scroll Animation
    gsap.fromTo(
      categoryRefs.current,
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".categories-container",
          start: "top 80%",
        }
      }
    );

  }, []);

  // 🔥 Animation Function
  const animateSlide = (index) => {
    const el = contentRefs.current[index];
    if (!el) return;

    const tl = gsap.timeline();

    tl.fromTo(
      el.querySelectorAll("span"),
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 1,
        ease: "power4.out"
      }
    )
      .fromTo(
        el.querySelector("p"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(
        el.querySelector("a"),
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "-=0.4"
      );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,

    beforeChange: () => {
      gsap.set(contentRefs.current, { opacity: 0 });
    },

    afterChange: (current) => {
      animateSlide(current);
    }
  };

  const categories = [
    { name: "Sofa", image: "/sofa.png" },
    { name: "Table", image: "/table.png" },
    { name: "Wardrobe", image: "/wardrobe.png" },
    { name: "Bed", image: "/bed.png" },
    { name: "Chair", image: "/chair.png" },
    { name: "Office Furniture", image: "/office.png" },
    { name: "Outdoor Furniture", image: "/outdoor.png" },
    { name: "Kids Furniture", image: "/kids.png" }
  ];

  // 🔥 Helper for splitting text
  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i}>{char}</span>
    ));
  };

  return (
    <>
      {/* 🔥 CAROUSEL */}
      <Slider ref={sliderRef} {...settings}>

        {/* Slide 1 */}
        <div>
          <div className="slide">
            <img src="/carousel1.png" alt="slide1" />
            <div className="overlay"></div>

            <div className="content" ref={el => contentRefs.current[0] = el}>
              <h1>
                {splitText("Bring Comfort Home - Style Every Corner With Elegance")}
              </h1>
              <p>Make your home stylish and modern</p>
              <Link className='btn btn-success border' to='/products'>
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div>
          <div className="slide">
            <img src="/carousel2.png" alt="slide2" />
            <div className="overlay"></div>

            <div className="content" ref={el => contentRefs.current[1] = el}>
              <h1>
                {splitText("Modern Living Starts Here - Designed for Your Style")}
              </h1>
              <p>Make your home stylish and modern</p>
              <Link className='btn btn-success border' to='/products'>
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div>
          <div className="slide">
            <img src="/carousel3.png" alt="slide3" />
            <div className="overlay"></div>

            <div className="content" ref={el => contentRefs.current[2] = el}>
              <h1>
                {splitText("Turn Your House Into a Statement of Style and Comfort")}
              </h1>
              <p>Make your home stylish and modern</p>
              <Link className='btn btn-success border' to='/products'>
                Shop Now
              </Link>
            </div>
          </div>
        </div>

      </Slider>

      {/* 🔥 CATEGORIES */}
      <div className="p-5 text-center">
        <h2 className="mb-5" style={{ fontSize: '32px', fontWeight: '600' }}>
          Explore Categories
        </h2>

        <div className="categories-container">
          {categories.map((item, index) => (
            <div
              key={index}
              className="category-card d-flex"
              ref={el => categoryRefs.current[index] = el}
            >
              <img src={item.image} alt={item.name} />
              <div className="category-overlay">
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 BUTTON */}
      <div className="text-center mt-4">
        <Link to="/products" className="browse-btn">
          Browse All Products
        </Link>
      </div>

    </>
  )
}

export default Home;