import React from 'react'
import MarketplaceCard from './MarketplaceCard'
import {Link } from 'react-router-dom';

const Marketplacenx = () => {
  return (
    <>
    <div className="text-center bg-slate-100 h-screen">
        <br />
     <span className="text-5xl">Shop</span>
     <div className="flex flex-wrap items-center justify-center">
     <MarketplaceCard price="$ 250 pts" image="src\assets\homework.png" cardname="Extension on Homework"/>
     <MarketplaceCard price="$ 250 pts" image="src\assets\online-course.png" cardname="Artificial Inteligence Course"/>
     <MarketplaceCard price="$ 250 pts" image="src\assets\game-controller.png" cardname="75 Valorant Points"/>
     </div>
     <Link to={"/marketplace"}><button className="bg-white text-[#BA68C8] border-[#BA68C8] border-2 hover:bg-[#BA68C8] hover:text-white duration-300 p-3 rounded-sm ">Buy Power-Ups</button></Link>
     </div>
    </>
  )
}

export default Marketplacenx