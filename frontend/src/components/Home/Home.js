import React from 'react'
import Carousel from './Carousel/Carousel'
import Features from './Features/Features'
import ProductShow from './ProductShow/ProductShow'
import SelfAd from './SelfAd/SelfAd'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Home = () => {
  return (
    <>
    <Header/>
    <Carousel/>
    <Features/>
    <ProductShow/>
    <SelfAd/>
    <Footer/>
    </>
  )
}

export default Home