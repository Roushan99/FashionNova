import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserRegistration from './UserRegistration'
import Login from './Login'
import MensProducts from './MensProducts'
import ProductDetail from './ProductDetails'
import Home from './Home'
import App from '../App'
import Cartpage from './Cartpage'
import Orders from './Orders'
import UserDetails from './UserDetails'
import Maintenance from './Maintenance'
// import PaymentGateway from './PaymentGateway'

function AllRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signIn' element={<Login/>}></Route>
        <Route path='/signUp' element={<UserRegistration/>}/>
        <Route path='/mensproducts' element={<MensProducts/>}/>
        <Route path='/productdetail/:id' element={<ProductDetail/>}/>
        <Route path='/cart' element={<Cartpage/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/profile' element={<UserDetails/>}/>
        <Route path='/underwork' element={<Maintenance/>}/>
        {/* <Route path='/payment' element={<PaymentGateway/>}/> */}
    </Routes>
  )
}

export default AllRoutes