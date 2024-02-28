import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r deom from-black'>
        <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-lg w-1/4'>{overview}</p>
        <div className='my-4 md:m-0'>
        <button className='bg-white text-black py-1 md:py-4 rounded-md px-3 md:px-16 text-xl hover:bg-opacity-80'> ▶ Play</button>
        <button className='hidden md:inline-block  bg-gray-500 mx-2 p-4 bg-opacity-50 rounded-md px-16 text-xl text-white'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;