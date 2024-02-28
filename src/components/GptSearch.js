import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL } from '../utils/constants';

const GptSearch = () => {
  return (
    <>
    <div className="fixed inset-0 -z-10 opacity-70 bg-repeat">
            <img className="h-screen object-cover w-full" src={BG_URL} alt="banner"/>
    </div>

    <div className=''>
        <GptSearchBar/>
        <GptMovieSuggestions/>
    </div>
    </>
  );
};

export default GptSearch;