import React, { useEffect, useState } from "react";
import ChallengeCard from "./ChallengeCard.tsx";
import axios from "axios";
const Challenge = () => {
  const [challenges, setChallenges] = useState({});

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/getChallenges").then((res) => {
      setChallenges(res.data);
    });
  }, []);
  return (
    <>
      <div className="flex flex-col gap-10 items-center mt-16">
        {Object.entries(challenges).map(([challengeId, value]) => (
          <ChallengeCard
            key={challengeId}
            challengeName={value}
            points="+20 pts"
          />
        ))}
      </div>
    </>
  );
};

export default Challenge;
