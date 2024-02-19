import { validateData } from "../utils/validate";
import Header from "./Header";
import { useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const dispatch = useDispatch()
    
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () =>{
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        //Validating form data
        const message = validateData(email.current.value ,password.current.value);
        setErrorMessage(message);
        if (message) return;

        if (!isSignInForm) {
            //This is Sign up Logic
            createUserWithEmailAndPassword(auth, email.current.value ,password.current.value)
                .then((userCredential) => {
                     // Signed up 
                    const user = userCredential.user;
                    //Adding functionality for display name here...
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://play-lh.googleusercontent.com/RX3ntjobJrEdwSgntRwSejMCjyeXrtEKpH4QrF-ikBjiEJFrqCdVEcp1LZOJ8T4ArQ"
                      }).then(() => {
                        // Profile updated!
                        //auth has the updated value, that's why we use auth in place of user
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
                        
                      }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message);
                        // ...
                      });
                      
                    
                 })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + errorMessage)
                    
                });
        } else {
            // This is Sign In Logic
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email.current.value ,password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + errorMessage)
                });

        }
    }
  return (
    <div>
        <Header/>
        <div className="absolute">
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/29d8d7d7-83cc-4b5f-aa9b-6fd4f68bfaa6/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_small.jpg"
            alt="banner"/>
        </div>
        <form onSubmit={(e) => e.preventDefault() } className=" text-white w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80 rounded-md">
            <h1 className="font-bold text-3xl py-4"> {isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-600 rounded-lg"/>}
            <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-600 rounded-lg"/>
            <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-600 rounded-lg"/>
            <p className="text-red-400 py-2 text-md">{errorMessage}</p>
            <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"} </button>
            <p className="py-2 cursor-pointer" onClick={toggleSignInForm} >{isSignInForm ? "New to Netflix ? Sign Up Now.": "Already a Member? Sign In."}</p>
        </form>
    </div>
  )
}
export default Login;

	
