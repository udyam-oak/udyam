import React from "react";
import axios from "axios";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "sonner";

const MarketplaceCard = ({ image, cardname, price }) => {
  const [user, setUser] = useLocalStorage("username", "");
  const onClick = () => {
    axios
      .get("http://127.0.0.1:5000/buy", {
        params: {
          name: user,
          item: cardname,
          price: price,
        },
      })
      .then((res) => {
        if (res.data.message) {
          toast.success(`Bought ${cardname}`);
        } else {
          toast.error(`Insufficient points`);
        }
      });
  };
  return (
    <>
      <div className="border border-[#263238] w-40 h-fit rounded-xl m-16 text-center flex flex-col p-3">
        <img src={image} alt="" className="rounded-t-xl h-fit" />
        <div>
          <span className="">{cardname}</span>
          <br />
          <span className=" font-semibold">{price}</span>
          <br />
          <button
            className="mt-2 rounded-md hover:bg-[#BA68C8] bg-[#7D538D] text-white p-1 duration-300"
            onClick={onClick}
          >
            BUY
          </button>
        </div>
      </div>
    </>
  );
};

export default MarketplaceCard;
