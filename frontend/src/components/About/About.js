import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import AboutHeader from '../About/AboutHeader'
import AboutSection from './AboutSection'
import MVission from './MVission'
import AboutCircle from './AboutCircle'
import Aboutus from './Aboutus'


const About = () => {
  return (
    <>
    <Header/>
    <AboutHeader/>
    <Aboutus/>
    <AboutSection/>
    <MVission/>
    <AboutCircle/>
    <Footer/>
    </>
  )
}

export default About