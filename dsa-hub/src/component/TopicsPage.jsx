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
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

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

  const topicCounts = questions.reduce((acc, question) => {
    const { topic, difficulty } = question;
    acc[topic] = acc[topic] || { total: 0, easy: 0, medium: 0, hard: 0 };
    acc[topic].total++;
    if (difficulty === "Easy") {
      acc[topic].easy++;
    } else if (difficulty === "Medium") {
      acc[topic].medium++;
    } else if (difficulty === "Hard") {
      acc[topic].hard++;
    }
    return acc;
  }, {});

  return (
    <>
      <Navbar />

      {questions.length === 0 ? (
        <div className="flex items-center justify-center mt-10">
          <h1 className="text-3xl font-semibold text-gray-500">
            No Questions Found
          </h1>
        </div>
      ) : (
        <div className="flex flex-wrap gap-x-4 gap-y-12 px-4 py-10 lg:px-20">
          {Object.entries(topicCounts).map(([topic, counts], index) => (
            <Link to={`/topics/${topic}`} className="flex w-72" key={index}>
              <div className="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                <div className="p-3">
                  <div className="pt-1 ">
                    <p className="text-xl font-semibold capitalize">{topic}</p>
                    <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
                      Total Solved: {counts.total}
                    </h4>
                  </div>
                </div>
                <hr className="opacity-50" />
                <div className="p-4">
                  <p className="font-light">
                    <span className="text-md font-bold text-green-400">
                      Easy:{" "}
                    </span>
                    {counts.easy}
                  </p>
                  <p className="font-light">
                    <span className="text-md font-bold text-yellow-400">
                      Medium:{" "}
                    </span>
                    {counts.medium}
                  </p>
                  <p className="font-light">
                    <span className="text-md font-bold text-red-400">
                      Hard:{" "}
                    </span>
                    {counts.hard}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default TopicsPage;
