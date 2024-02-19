import React from 'react'
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies)
        if(!movies) return;
    
    //This will give an error directly that's why added null logic above.
    //This is also known as early return.

    const mainMovie = movies[1];
    console.log(mainMovie);

    const { original_title, overview } = mainMovie;
//Passed to videotitle props
    return (
    <div>
        <VideoTitle title={original_title} overview={overview}/>
        <VideoBackground/>
    </div>
  )
}

export default MainContainer;