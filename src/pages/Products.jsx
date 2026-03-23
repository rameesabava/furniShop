import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Products() {
const [products, setProducts] = useState([])
      const getProducts = async ()=>{
try{
    const response = await axios.get("http://localhost:3000/products")
     setProducts(response.data)
    
  }catch(err){
    console.log(err);
    
  }
  }
  useEffect(()=>{
  getProducts()

  },[])

    return (
    <div>
      <div className="product-list">
      <h2 className="title">Our Products</h2>
      <div className="product-grid">
        {products.map((item) => (
          <div className="card" key={item.id}>
            <div className="image-container">
              <img src={item.image} alt={item.name} />
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
  )
}

export default Products