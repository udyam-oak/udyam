import React from 'react'


const MarketplaceCard = ({image, cardname, price}) => {
    
  return (
    <>
    <div className='border border-[#263238] w-40 h-56 rounded-xl m-16 text-center'>
        <img src={image} alt="" className='rounded-t-xl h-32 bg-slate-100'/>
        <span className=''>{cardname}</span><br />
        <span className=' font-semibold'>{price}</span><br />
        <button className='mt-2 rounded-md hover:bg-[#BA68C8] bg-[#7D538D] text-white p-1 duration-300'>&nbsp;BUY&nbsp;</button>
    </div>
    </>
  )
}

export default MarketplaceCard
