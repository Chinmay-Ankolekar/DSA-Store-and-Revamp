import { useState } from "react";
import { auth, GoogleProvider, db } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ user }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const Login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (auth.currentUser.email != null) {
        
        navigate("/dashboard");
        
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, GoogleProvider);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };
 

  return (
    <>
        <h1>DSA Hub</h1>
      <button className="border" onClick={signInWithGoogle}>Google signup</button>
      <br />

        <input
            type="email"
            className="border"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            />
        <br />
        <input
            type="password"
            className="border"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            />
        <br />
        <button onClick={Login}>Login</button>
        <br />
        <Link to="/signup">Signup</Link>

    </>
  );
};

export default Login;