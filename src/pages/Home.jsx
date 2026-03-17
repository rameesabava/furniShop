import React from 'react'

function Home() {
  return (
   // <div style={{backgroundImage:'url("/banner.png")', height:'100vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>

      
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img height={'700px'} src="/banner.png" class="d-block w-100" alt="carousel1"/>
    </div>
    <div class="carousel-item">
      <img height={'700px'} src="/carousel2.png" class="d-block w-100" alt="carousel2"/>
    </div>
    <div class="carousel-item">
      <img height={'700px'} src="/carousel3.png" class="d-block w-100" alt="carousel3"/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  )
}

export default Home