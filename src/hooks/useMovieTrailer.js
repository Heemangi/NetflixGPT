import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    //const [trailerId, setTrailerId] = useState()
  //Fetch the trailer video and updating the store with the videod data
  const getMovieVideos = async() => {
    const data = await fetch('https://api.themoviedb.org/3/movie/'+ movieId +'/videos?language=en-US', API_OPTIONS);
    const json = await data.json();
    console.log(json);
    const filterData = json?.results?.filter((video) => video.type === "Trailer");
    const trailer = filterData.length === 0? filterData[0]:json.results[0];
    console.log(trailer);
    //setTrailerId(trailer.key);
    //we provide trailerid to the src. this is one way to do this action. 
    //We will do using redux only. Dispatching an action here

    dispatch(addTrailerVideo(trailer));
  }

  useEffect(()=>{
    getMovieVideos();
  },[]); 

}

export default useMovieTrailer;