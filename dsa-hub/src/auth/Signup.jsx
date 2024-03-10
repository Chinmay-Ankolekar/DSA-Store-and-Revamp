import { useState } from "react";
import { auth, GoogleProvider } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const Signup = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      alert("User Created");
      navigate("/");
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
            type="text"
            className="border"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            />  
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
        <button className="border" onClick={signIn}>Signup</button>
        <br />
        <Link to="/">Login</Link>
    </>
  );
};

export default Signup;