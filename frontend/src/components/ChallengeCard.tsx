import React from 'react'

const ChallengeCard = ({challengeName, points}) => {
  return (
    <>
    <div className='flex w-9/12 justify-between items-center bg-slate-200 p-8 rounded-xl shadow-lg'>
        <div className='flex flex-col'>
       <span className='font-semibold'>{challengeName}</span>
       <span className='text-slate-700'>{points}</span>
       </div>
       <div className='flex flex-col'>
       <button className='p-4 bg-[#7D538D] text-white rounded-xl hover:bg-[#BA68C8] duration-300'>Attempt</button> 
       <button className='p-4 bg-[#7D538D] mt-2 text-white rounded-xl hover:bg-[#BA68C8] duration-300'>Leaderboard</button>
       </div>
    </div>
    </>
  )
}

export default ChallengeCard
