import React, { useState } from 'react'
import "./home.css"
import Header from '../../components/header/Header'
import ExploreMenu from '../../components/exploremenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Appdownload from '../../components/appdownload.jsx/Appdownload'

const Home = () => {
    const [category, setCategory] = useState("all");







  return (
    <div>
      <Header/>
      <ExploreMenu category={category}  setCategory={setCategory} />

      <FoodDisplay category={category}/>
      <Appdownload/>
    </div>
  )
}

export default Home
