import React, { useEffect, useState } from "react";
import MarketplaceCard from "./MarketplaceCard";
import { Link } from "react-router-dom";
import axios from "axios";

const Marketplace = () => {
  const [items, setItems] = useState({});
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/getMarketplace")
      .then((res) => setItems(res.data));
  }, []);
  return (
    <>
      <div className="text-center bg-slate-100 h-screen">
        <br />
        <span className="text-5xl">Power-Ups</span>
        <div className="flex flex-wrap items-center justify-center">
          {Object.entries(items).map(([key, value]) => (
            <MarketplaceCard
              cardname={key}
              price={value}
              image={`src/assets/${key}.png`}
            />
          ))}
        </div>
        <Link to={"/marketplacenx"}>
          <button className="bg-white text-[#BA68C8] border-[#BA68C8] border-2 hover:bg-[#BA68C8] hover:text-white duration-300 p-3 rounded-sm ">
            Buy In Shop
          </button>
        </Link>
      </div>
    </>
  );
};

export default Marketplace;

// grid grid-cols-4 place-items-center gap-10 place-content-evenly
