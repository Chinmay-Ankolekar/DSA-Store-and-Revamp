import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState } from "react";
import GetAllQuestions from "./GetAllQuestions";
import Navbar from "./Navbar";
import EasyQuestions from "./EasyQuestions";
import MediumQuestions from "./MediumQuestions";
import HardQuestions from "./HardQuestions";

const Dashboard = ({ user }) => {
 let navigate = useNavigate();
  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
    
      <Navbar user={user}/>
      <br />
      <GetAllQuestions user={user} />
      <EasyQuestions user={user} /> 
      <MediumQuestions user={user}/>
      <HardQuestions user={user}/>
    </div>
  );
};

export default Dashboard;
