import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

const MainLayout = () => {
  return (
    <div className='dark:bg-black overflow-hidden'>
      <NavBar/>
     <Outlet/>
     <Footer/>
    </div>
  )
}

export default MainLayout
