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
      );

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
      {/* <h1>DSA Hub</h1>

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
        <Link to="/">Login</Link> */}

      <div className="mx-auto my-10 max-w-md rounded-xl border px-4 py-10 text-gray-700 shadow-lg sm:px-8">
        <div className="mb-16 flex justify-between">
          <span className="font-bold">
            <span className="inline-block h-3 w-3 bg-blue-600"></span>Store and
            Revamp
          </span>
          <span className="">
            Have account?{" "}
            <Link to="/" className="font-medium text-blue-600 hover:underline">
              Log in
            </Link>
          </span>
        </div>
        <p className="mb-5 text-3xl font-medium">DSA Store and Revamp</p>
        <p className="mb-6 text-sm">
          "DSA Store and Revamp" implies a platform for storing and revising
          solved DSA questions
        </p>
        <div className="mb-6">
          <div className="focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition">
            <input
              type="text"
              id="name"
              className="w-full flex-1 appearance-none border-blue-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition">
            <input
              type="email"
              id="email"
              className="w-full flex-1 appearance-none border-blue-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition">
            <input
              type="password"
              id="password"
              className="w-full flex-1 appearance-none border-blue-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="mb-6 mr-1 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
            onClick={signIn}
          >
            Signup
          </button>
          <button
            className="mb-6 mr-1 flex items-center rounded-md border px-2 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-blue-600 hover:text-white"
            onClick={signInWithGoogle}
          >
            <img
              className="mr-2 h-4"
              src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
              alt="Google icon"
            />
            Log in with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
