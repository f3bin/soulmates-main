import React from 'react'
import HomeNavbar from '../../components/home-navbar/HomeNavbar'
import homeBackground from '../../images/backgroundHome.jpg'
import './Home.scss'
import HomeCards from '../../components/home-cards/HomeCards'

const Home = () => {
  return (
    <div className='Home-container'>
      <HomeNavbar />
      <img  src={homeBackground} alt=''/>
      <HomeCards />
    </div>
  )
}

export default Home
