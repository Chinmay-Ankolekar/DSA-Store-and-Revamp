import React, { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { onSnapshot, query, where } from "firebase/firestore";

const HardQuestions = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const DsaRef = collection(db, "dsa");
  const userEmail = user.email;

  const getHardQuestions = () => {
    try {
      const unsubscribe = onSnapshot(
        query(
          DsaRef,
          where("email", "==", userEmail),
          where("difficulty", "==", "Hard")
        ),
        (querySnapshot) => {
          const Questions = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setQuestions(Questions);
          console.log(Questions, "Hard");
        }
      );
      return unsubscribe;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = getHardQuestions();
    return () => unsubscribe;
  }, []);

  return (
    <>
      {questions.length === 0 ? (
        ""
      ) : (
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h2 className="font-semibold text-gray-700">Hard Problems</h2>
              <span className="text-xs text-gray-500">
                View hard problems you solved
              </span>
            </div>
            <div className="flex items-center justify-between"></div>
          </div>
          <div className="overflow-y-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3">Question</th>
                    <th className="px-5 py-3">Topic</th>
                    <th className="px-5 py-3">Link</th>
                    {/* <th className="px-5 py-3">Created At</th> */}
                    <th className="px-5 py-3">Actions</th>
                    <th className="px-5 py-3">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500">
                  {questions
                    .slice()
                    .sort((a, b) => b.time.toMillis() - a.time.toMillis())
                    .map((question) => (
                      <tr key={question.id}>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="whitespace-no-wrap">
                                {question.questions}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="whitespace-no-wrap">
                                {question.topic}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <a
                              href={question.Link}
                              className="whitespace-no-wrap text-blue-600 hover:text-blue-900"
                            >
                              Link
                            </a>
                          </div>
                        </td>
                        
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <button
                            onClick={() => {
                              handleDelete(question.id);
                            }}
                            className="text-red-400 whitespace-no-wrap hover:text-red-600"
                          >
                            Delete
                          </button>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              question.difficulty === "Easy"
                                ? "bg-green-200 text-green-900"
                                : question.difficulty === "Medium"
                                ? "bg-yellow-200 text-yellow-900"
                                : question.difficulty === "Hard"
                                ? "bg-red-200 text-red-900"
                                : ""
                            }`}
                          >
                            {question.difficulty}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HardQuestions;
