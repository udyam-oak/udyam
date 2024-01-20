import React from 'react'


const MarketplaceCard = ({image, cardname, price}) => {
    
  return (
    <>

    <div className='border border-[#263238] w-40 h-fit rounded-xl m-16 text-center flex flex-col p-3'>
        <img src={image} alt="" className='rounded-t-xl h-fit'/>
        <div>
        <span className=''>{cardname}</span><br />
        <span className=' font-semibold'>{price}</span><br />
        <button className='mt-2 rounded-md hover:bg-[#BA68C8] bg-[#7D538D] text-white p-1 duration-300'>&nbsp;BUY&nbsp;</button>
        </div>
    </div>
    </>
  )
}

export default MarketplaceCard
