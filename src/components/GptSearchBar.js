import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    const handleGptSearchClick = async() => {
        console.log(searchText.current.value);

        const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query : " + searchText.current.value + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result : Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
        
        const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
        });

        if(!gptResults.choices)
        {//Error handling
         }

        console.log(gptResults.choices?.[0]?.message.content);
        //This will give an array of movies
        const gptMovies= gptResults.choices?.[0]?.message.content.split(",");
    //We pass the obtained promise array, when all these will be resolved
    //Then only we get the results.
         const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

         const tmdbResults = await Promise.all(promiseArray);
         console.log(tmdbResults)

        dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
    
    };

//Movie Search function in TMDB database
//This will return a promise not the result
// For each movies we are fetching this request. It will return a promise for each call
//5 movies 5 calls her. Async operaiton takes time
// 
    const searchMovieTMDB = async(movie) => {
        const data = await fetch(
            'https://api.themoviedb.org/3/search/movie?query='+ movie+
            '&include_adult=false&language=en-US&page=1', API_OPTIONS); 

        const json = await data.json();
        return json.results;
    };

  return (
    <div className='pt-[10%] flex justify-center'>
        <form 
        className='w-1/2 bg-black grid grid-cols-12'
        onSubmit={(e) => e.preventDefault()}>
            <input 
            ref= {searchText}
            type='text' 
            className='p-4 m-4 col-span-9 rounded-lg' 
            placeholder={lang[langKey].gptSearchPlaceholder}/>
            {/**lang[langKey] to make it dynamic since langkey is not defined anywhere in slice*/}
            <button className=' col-span-3 m-4 py-2 px-4 bg-red-600 text-white rounded-lg'
            onClick={handleGptSearchClick}
            >
                {lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar