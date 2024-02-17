import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { Children, createContext, useEffect, useState } from 'react';
import { app } from '../Components/firebase/firebase.config';
import axios from 'axios';
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [user,setUser] = useState(null);
    const auth = getAuth(app);
    const GoogleProvider = new GoogleAuthProvider();


    //createUserWithEmailAndPassword
    const createUserWithEmailAndPass = (email, password)=>{
        setIsLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
        
    }

    //SignInWithEmailAndPassWord
    const SignInWithEmailAndPass = (email, password)=>{
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    //google login
    const GoogleLogin = ()=>{
        setIsLoading(true);
        return signInWithPopup(auth, GoogleProvider);
    }

    //logout
    const Logout = ()=>{
        return signOut(auth);
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , currentUser=>{
            setUser(currentUser)
            if (currentUser){
                axios.post('http://localhost:5000/jwt',{email : currentUser.email})
                .then(data=>{
                    localStorage.setItem('access-token', data.data.token)
                })
            }
            else{
                localStorage.removeItem('access-token')
            }

        })
        return ()=>{
            setIsLoading(false)
            return unsubscribe
        }
    },[])

    const authInfo = {
        user,
        isLoading,
        GoogleLogin,
        Logout,
        createUserWithEmailAndPass,
        SignInWithEmailAndPass,
        setIsLoading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;