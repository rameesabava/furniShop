import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductView from './pages/ProductView'
import Order from './pages/Order'
import PageNotFound from './pages/PageNotFound'
import Header from './components/Header'
import Footer from './components/Footer'


function App() {

  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductView />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/*' element={<PageNotFound/>}/> 

      </Routes>
      <Footer/>
    </>
  )
}

export default App
