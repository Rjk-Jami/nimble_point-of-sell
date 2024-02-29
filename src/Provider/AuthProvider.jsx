import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { Children, createContext, useEffect, useState } from 'react';
import { app } from '../Components/firebase/firebase.config';
import axios from 'axios';
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const GoogleProvider = new GoogleAuthProvider();


    //createUserWithEmailAndPassword
    const createUserWithEmailAndPass = (email, password) => {
        setIsLoadingAuth(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    //SignInWithEmailAndPassWord
    const SignInWithEmailAndPass = (email, password) => {
        setIsLoadingAuth(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    //google login
    const GoogleLogin = () => {
        setIsLoadingAuth(true);
        return signInWithPopup(auth, GoogleProvider);
    }

    //logout
    const Logout = () => {
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            //    console.log(currentUser)
          




            if (currentUser) {
                axios.post('https://nimble-server-seven.vercel.app/jwt', { email: currentUser.email })
                    .then(data => {
                        if(data.data.token){
                            localStorage.setItem('access-token', data.data.token)
                            //need to change -=========================================
    
                            localStorage.setItem('inLog', import.meta.env.VITE_INLOGTOKEN)
                            setIsLoadingAuth(false)
                        }
                        
                        
                        
                    })
            }
            else {

                localStorage.removeItem('access-token')
                localStorage.removeItem('inLog')
            }

        })
        return () => {
            setIsLoadingAuth(false)
            return unsubscribe
        }
    }, [])
    console.log(isLoadingAuth, "auth")

    const authInfo = {
        user,
        isLoadingAuth,
        GoogleLogin,
        Logout,
        createUserWithEmailAndPass,
        SignInWithEmailAndPass,
        setIsLoadingAuth
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;