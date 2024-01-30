import React from 'react'
import { Routes,Route } from 'react-router-dom'
import MainPage from '../Main/MainPage'
import DetailsPage from '../Main/DetailsPage'


const Routing = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/details/:name' element={<DetailsPage />} />
        </Routes>
    </div>
  )
}

export default Routing