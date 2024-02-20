import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r deom from-black'>
        <h1 className='text-6xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/4'>{overview}</p>
        <div className=''>
        <button className='bg-white text-black p-4 rounded-md px-16 text-xl hover:bg-opacity-80'> ▶ Play</button>
        <button className='bg-gray-500 mx-2 p-4 bg-opacity-50 rounded-md px-16 text-xl text-white'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;