import React from "react";
import MarketplaceCard from "./MarketplaceCard";
import {Link} from 'react-router-dom';

const Marketplace = () => {
  return(
    <>
    <div className="text-center bg-slate-100 h-screen">
    <br />
    <span className="text-5xl">Power-Ups</span>
    <div className="flex flex-wrap items-center justify-center">

    <MarketplaceCard price="$ 250 pts" image="src\assets\2x.png" cardname="Points Multiplier"/>
    <MarketplaceCard price="$ 250 pts" image="src\assets\snowflake.png" cardname="Time Freeze"/>
    <MarketplaceCard price="$ 250 pts" image="src\assets\hygiene.png" cardname="Insurance"/>

    

    </div>
    <Link to={"/marketplacenx"}><button className="bg-white text-[#BA68C8] border-[#BA68C8] border-2 hover:bg-[#BA68C8] hover:text-white duration-300 p-3 rounded-sm ">Buy In Shop</button></Link>
    </div>
    </>
  );
};

export default Marketplace;

// grid grid-cols-4 place-items-center gap-10 place-content-evenly