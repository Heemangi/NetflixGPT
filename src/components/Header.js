import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);


  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
//Doing routing from here only nowhere else.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL,}))
          navigate("/browse")
        } else {
          dispatch(removeUser());
          navigate("/")
          
        }
      });
      //Unsubscribe to component unmounts
      return () => unsubscribe();
}, []);

  const handleGptSearchClick = () =>{
  //Toggling the GPT Search
    dispatch(toggleGptSearchView());
  }
  
  //onchange will trigger an event 
  const handleLanguageChange = (e) => {
    //console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  }


  return (
    <div className="logopositioning absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
        <img className="logosizing w-44 mx-auto md:mx-0"
        src={LOGO}
        alt="logo"/>
        {user && (<div className="flex p-2 justify-between">
          {showGptSearch && <select className=" rounded-lg p-2 bg-gray-900 text-white mx-2 h-12" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value = {lang.identifier}>{lang.name}</option> )}
          </select>}
          
        <button className="py-2 px-4 mx-4 bg-red-400 text-white rounded-lg h-12"
        onClick={handleGptSearchClick}
        >{showGptSearch ? "Home Page" : "GPT Mode"}</button>
        <img className="w-12 h-12" alt="usericon" src={user?.photoURL}/>
        <button onClick={handleSignOut} className="text-white font-bold">Sign Out</button>
        </div>)}
    </div>
  )
}

export default Header;