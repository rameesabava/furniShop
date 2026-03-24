import React, { useRef, useEffect } from 'react'
import '../App.css'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from 'react-router-dom'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

function Home() {

  // hook for carousel
  const sliderRef = useRef()

  // content hook
  const contentRefs = useRef([])

  //category ref
  const categoryRefs = useRef([])

  useEffect(() => {
    gsap.set(contentRefs.current, { opacity: 0 })

    // animation
    animateSlide(0)

    // categories animation
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
          trigger: ".category",
          start: "top 80%",
        }
      }
    );

  }, []);

  //  animation function
  const animateSlide = (index) => {
    const el = contentRefs.current[index];
    if (!el) return;
    gsap.set(el, { opacity: 1 });

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
      )
  }

  //carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    fade:true,

    beforeChange: (current, next) => {
      gsap.set(contentRefs.current[current], { opacity: 0 })
            gsap.set(contentRefs.current[next], { opacity: 0 })

    },

    afterChange: (current) => {
      animateSlide(current)
    }
  }

  const categories = [
    { name: "Sofa", image: "/sofa.png" },
    { name: "Table", image: "/table.png" },
    { name: "Wardrobe", image: "/wardrobe.png" },
    { name: "Bed", image: "/bed.png" },
    { name: "Chair", image: "/chair.png" },
    { name: "Office Furniture", image: "/office.png" },
    { name: "Outdoor Furniture", image: "/outdoor.png" },
    { name: "Kids Furniture", image: "/kids.png" }
  ]

  //  splitText
  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i}>{char}</span>
    ))
  }

  return (
    <>
      {/*  carousel section */}
      <Slider ref={sliderRef} {...settings}>

        {/* slide 1 */}
        <div>
          <div className="slide">
            <img src="/carousel1.png" alt="slide1" />
            <div className="shade"></div>

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

      {/* categories section */}
      <div className="p-5 text-center">
        <h2 className="mb-5" style={{ fontSize: '32px', fontWeight: '600' }}>
          Explore Categories
        </h2>

        <div style={{gap:'20px'}} className="d-flex flex-wrap justify-content-center category">
          {categories.map((item, index) => (
            <div key={index} className="categoryCard" ref={el => categoryRefs.current[index] = el}>
              <img src={item.image} alt={item.name} />
              <div className="categoryShade">
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* button to browse products */}
      <div className="text-center mt-4">
        <Link to="/products" className="browseBtn">
          Browse All Products
        </Link>
      </div>

    </>
  )
}

export default Home