import React from 'react'
import Carousel from './Carousel/Carousel'
import Features from './Features/Features'
import ProductShow from './ProductShow/ProductShow'
import SelfAd from './SelfAd/SelfAd'
import Footer from '../Footer/Footer'

const Home = () => {
  return (
    <>
    <Carousel/>
    <Features/>
    <ProductShow/>
    <SelfAd/>
    </>
  )
}

export default Home