import React from "react";
import { Link } from "react-router-dom";

const ChallengeCard = ({ challengeName, points, id }) => {
  return (
    <>
      <div className="flex w-9/12 justify-between items-center bg-slate-200 p-8 rounded-xl shadow-lg">
        <div className="flex flex-col">
          <span className="font-semibold">{challengeName}</span>
          <span className="text-slate-700">{points}</span>
        </div>
        <div className="flex flex-col">
          <Link
            className="p-4 bg-[#7D538D] text-white rounded-xl hover:bg-[#BA68C8] duration-300"
            to={`/challenge/${id}`}
          >
            Attempt
          </Link>
          <button className="p-4 bg-[#7D538D] mt-2 text-white rounded-xl hover:bg-[#BA68C8] duration-300">
            Leaderboard
          </button>
        </div>
      </div>
    </>
  );
};

export default ChallengeCard;
