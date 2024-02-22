import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const user = useSelector((store) => store.user);
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

  return (
    <div className="logopositioning absolute justify-between flex w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
        <img className="logosizing w-44"
        src={LOGO}
        alt="logo"/>
        {user && (<div className="flex p-2 space-x-2">
        <button className="py-2 px-4 mx-4 bg-red-400 text-white rounded-lg h-12"
        onClick={handleGptSearchClick}
        >GPT Mode</button>
        <img className="w-12 h-12" alt="usericon" src={user?.photoURL}/>
        <button onClick={handleSignOut} className="text-white font-bold">Sign Out</button>
        </div>)}
    </div>
  )
}

export default Header;