import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";

const AllTopics = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const userEmail = user.auth.currentUser.email;

  const DsaRef = collection(db, "dsa");

  const getQuestions = async () => {
    try {
      const querySnapshot = await getDocs(
        query(DsaRef, where("email", "==", userEmail))
      );
      const Questions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuestions(Questions);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const topics = questions.map((question) => question.topic);
  const topicCounts = topics.reduce((acc, topic) => {
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <h1>All Topics</h1>
      {Object.entries(topicCounts)
        .sort()
        .map(([topic, count], index) => (
          <button
            onClick={() => {
              navigate(`/topics/${topic}`);
            }}
          >
            <h3>
              {topic} ({count})
            </h3>
          </button>
        ))}
    </>
  );
};

export default AllTopics;
