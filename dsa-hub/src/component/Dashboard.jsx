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
import AddQuestions from "./AddQuestions";
import GetAllQuestions from "./GetAllQuestions";
import AllTopics from "./AllTopics";

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
      <h1>Dashboard</h1>
      <button onClick={signOutUser}>Logout</button>
      <br />
      {/* <AddQuestions user={user} /> */}
      <GetAllQuestions user={user} />
      {/* <AllTopics user={user}/> */}
    </div>
  );
};

export default Dashboard;
