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

const TopicsPage = ({ user }) => {
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
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold ">Topics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Object.entries(topicCounts).map(([topic, count], index) => (
          <button
            key={index}
            onClick={() => {
              navigate(`/topics/${topic}`);
            }}
            className="flex flex-col items-center justify-center h-24 p-2 bg-white shadow-md rounded-lg hover:shadow-lg"
          >
            <p className="font-medium text-gray-800">{topic}</p>
            <p className="text-sm text-gray-600">Total: {count}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicsPage;
