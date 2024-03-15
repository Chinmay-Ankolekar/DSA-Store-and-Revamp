import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";

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

    const unsubscribe = onSnapshot(
      query(DsaRef, where("email", "==", userEmail)),
      (snapshot) => {
        const updatedQuestions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(updatedQuestions);
      }
    );

    return () => unsubscribe();
  }, []);

  const topics = questions.map((question) => question.topic);
  const topicCounts = topics.reduce((acc, topic) => {
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1>All Topics</h1>
      <div>
        {Object.entries(topicCounts)
          .sort()
          .map(([topic, count]) => (
            <button
              key={topic}
              onClick={() => {
                navigate(`/topics/${topic}`);
              }}
            >
              {topic} ({count})
            </button>
          ))}
      </div>
    </div>
  );
};

export default AllTopics;
