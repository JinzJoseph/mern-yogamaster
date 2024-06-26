import React, { createContext, useEffect, useState } from "react";
import { app } from "../../config/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [err, setErr] = useState("");

  const auth = getAuth(app);

  // signup user
  const signup = async (email, password) => {
    try {
      setLoader(true);
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErr(error.message);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  // login user
  const login = async (email, password) => {
    try {
      setLoader(true);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErr(error.message);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  // logout user
  const logout = async () => {
    try {
      setLoader(true);
      return await signOut(auth);
    } catch (error) {
      setErr(error.message);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  // update user profile
  const updateUser = async (displayName, photoURL) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL,
      });
      setUser(auth.currentUser);
    } catch (error) {
      setErr(error.message);
      throw error;
    }
  };

  // google login
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      setLoader(true);
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setErr(error.message);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  // observer for user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        axios
          .post("http://localhost:3000/api/set-token", {
            email: user.email,
            name: user.displayName,
            photoUrl: user.photoURL,
          })
          .then((data) => {
          
            if (data.data.token) {
              localStorage.setItem("token", data.data.token);
              setLoader(false);
            }
          })
          .catch((error) => {
            setErr(error.message);
            setLoader(false);
          });
      } else {
        localStorage.removeItem("token");
        setLoader(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const contextValue = {
    user,
    signup,
    login,
    logout,
    updateUser,
    googleLogin,
    err,
    setErr,
    loader,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
