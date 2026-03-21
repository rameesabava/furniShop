import React, { useRef, useEffect } from 'react'
import Slider from "react-slick";
import '../App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

function Home() {

  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
    pauseOnFocus: false,
    fade: true,
    cssEase: "ease-in-out",
    waitForAnimate: false
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
  return (
    <>
      {/* 🔥 Carousel */}
      <Slider ref={sliderRef} {...settings}>

        {/* Slide 1 */}
        <div>
          <div className="slide">
            <img src="/carousel1.png" alt="slide1" />
            <div className="overlay"></div>

            <div className="content">
              <h1>
                Bring Comfort <br /> Home - Style Every Corner <br />With Elegance
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

            <div className="content">
              <h1>
                Modern Living <br />Starts Here - Designed <br /> for Your Style
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

            <div className="content">
              <h1>
                Turn Your House <br /> Into a Statement of <br /> Style and Comfort
              </h1>
              <p>Make your home stylish and modern</p>
              <Link className='btn btn-success border' to='/products'>
                Shop Now
              </Link>
            </div>
          </div>
        </div>

      </Slider>

      {/* Categories Section */}
      <div className="categories-section">
        <h2 className="cat-title">Explore Categories</h2>

        <div className="categories-container">
          {categories.map((item, index) => (
            <div key={index} className="category-card">
              <img src={item.image} alt={item.name} />
              <div className="category-overlay">
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home;