import React, { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase";

const EasyQuestions = ({user}) => {
  const [questions, setQuestions] = useState([]);
  const DsaRef = collection(db, "dsa");

  const getEasyQuestion = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            DsaRef,
            where("email", "==", userEmail),
            where("difficulty", "==", "Easy"),
          )
        );
        const Questions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGetEasy(Questions);
        console.log(Questions, "Easy");
      } catch (error) {
        console.log(error.message);
      }
    };



  return <></>;
};

export default EasyQuestions;
