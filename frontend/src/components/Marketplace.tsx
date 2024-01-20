import React from "react";
import MarketplaceCard from "./MarketplaceCard";

const Marketplace = () => {
  return(
    <>
    <div className="flex flex-wrap items-center justify-center">
    <MarketplaceCard price="$ 250 pts" image="$nbsp;" cardname="Coin UnBoost"/>
    <MarketplaceCard price="$ 250 pts" image="$nbsp;" cardname="Coin UnBoost"/>
    <MarketplaceCard price="$ 250 pts" image="$nbsp;" cardname="Coin UnBoost"/> 
    <MarketplaceCard price="$ 250 pts" image="$nbsp;" cardname="Coin UnBoost"/>
    <MarketplaceCard price="$ 250 pts" image="$nbsp;" cardname="Coin UnBoost"/>
    <MarketplaceCard price="$ 250 pts" image="$nbsp;" cardname="Coin UnBoost"/>
    <MarketplaceCard price="$ 250 pts" image="$nbsp;" cardname="Coin UnBoost"/>
    <MarketplaceCard price="$ 250 pts" image="$nbsp;" cardname="Coin UnBoost"/>
    <MarketplaceCard price="$ 250 pts" image="$nbsp;" cardname="Coin UnBoost"/>
    <MarketplaceCard price="$ 250 pts" image="$nbsp;" cardname="Coin UnBoost"/>

    </div>
    </>
  );
};

export default Marketplace;

// grid grid-cols-4 place-items-center gap-10 place-content-evenly