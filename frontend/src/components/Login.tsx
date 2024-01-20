import React from 'react'

const Login = () => {
  return (
    <>
    <div className="flex justify-between font-poppins bg-slate-100 text-[#263238]">
        <div className='bg-[#BA68C8] h-screen w-1/3'>
            <img src="src\assets\Image--.png" alt="" className='translate-x-1/2 translate-y-32' id='login-page-image' />
        </div>
        <div className="flex flex-col items-center my-32 mx-56 ">
            <h1 className="text-6xl m-4">LOGIN</h1><br />
            <form action="">
                <label htmlFor="" className='text-xl my-2 ml-2'>Username</label><br />
                <input type="text" name="name" className='border-2 border-[#7D538D] rounded text-3xl mt-2 h-11 w-96 ' /><br /><br/><br/>
                <label htmlFor="" className='text-xl ml-2 mt-36'>Password</label><br />
                <input type="password" name="password" className='border-2 border-[#7D538D] rounded text-3xl mt-2 h-11 w-96 ' /><br />
                <input type="submit" className='cursor-pointer hover:bg-[#BA68C8] duration-500 text-xl mt-12 bg-[#7D538D] px-10 py-2 rounded text-white w-96' value={"LOGIN"}/><br/>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login
