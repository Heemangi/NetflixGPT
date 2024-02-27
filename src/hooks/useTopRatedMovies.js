import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const topRatedMovies = useSelector((store) => store.movie.topRatedMovies)


  const getTopRatedMovies = async() => {
    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated', API_OPTIONS);
    const json = await data.json();
    //console.log(json.results);
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(()=>{
    if(!topRatedMovies)
    getTopRatedMovies();
  },[])
};

export default useTopRatedMovies;