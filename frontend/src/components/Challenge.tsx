import React from "react";
import ChallengeCard from "./ChallengeCard.tsx"

const Challenge = () => {
  return(
    <>
    <div className="flex flex-col gap-10 items-center mt-16">
    <ChallengeCard challengeName="Math 101" points="+ 20 pts"/>
    <ChallengeCard challengeName="Math 101" points="+ 20 pts"/>
    </div>
    </>
  );
};

export default Challenge;
