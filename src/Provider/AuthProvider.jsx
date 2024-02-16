import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import React, { Children, createContext, useEffect, useState } from 'react';
import { app } from '../Components/firebase/firebase.config';
import axios from 'axios';
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [user,setUser] = useState(null);
    const auth = getAuth(app);
    const GoogleProvider = new GoogleAuthProvider();

    const GoogleLogin = ()=>{
        setIsLoading(true);
        return signInWithPopup(auth, GoogleProvider);
    }
    const Logout = ()=>{
        return signOut(auth);
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            if(currentUser){
                axios.post("http://localhost:5000/jwt", {email : currentUser.email})
                .then(data =>{
                    // set when user - 1
                    console.log(data)
                    localStorage.setItem('access-token', data.data.token)
                })
            }
            else{
                //remove when user - 0
                localStorage.removeItem('access-token')
            }

            setIsLoading(false)
        })
        return ()=>{
            setIsLoading(true);
            return unSubscribe;
        }
    },[])

    const authInfo = {
        user,
        isLoading,
        GoogleLogin,
        Logout,
        setIsLoading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;