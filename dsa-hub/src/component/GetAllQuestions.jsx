import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import AddQuestions from "./AddQuestions";

const GetAllQuestions = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const [getEasy, setGetEasy] = useState([]);
  const [getMedium, setGetMedium] = useState([]);
  const [getHard, setGetHard] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [link, setlink] = useState("");
  const [topic, setTopic] = useState("Arrays");
  const [difficulty, setDifficulty] = useState("Easy");
  const navigate = useNavigate();
  const userEmail = user.auth.currentUser.email;

  const DsaRef = collection(db, "dsa");

  const handleAddProblem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const addQuestion = async () => {
    try {
      const docRef = await addDoc(DsaRef, {
        email: user.auth.currentUser.email,
        time: user.metadata.creationTime,
        questions: question,
        Link: link,
        topic: topic,
        difficulty: difficulty,
      });
      console.log("Document written with ID: ", docRef.id);
      // window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  let count = getEasy.length + getMedium.length + getHard.length;
  let easy = getEasy.length;
  let medium = getMedium.length;
  let hard = getHard.length;

  const handleDelete = async (id) => {
    try {
      const DsaDoc = doc(db, "dsa", id);
      await deleteDoc(DsaDoc);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const unsubscribeAll = [
      onSnapshot(query(DsaRef, where("email", "==", userEmail)), (snapshot) => {
        const updatedQuestions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(updatedQuestions);
      }),
      onSnapshot(
        query(
          DsaRef,
          where("email", "==", userEmail),
          where("difficulty", "==", "Easy")
        ),
        (snapshot) => {
          const updatedQuestions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGetEasy(updatedQuestions);
        }
      ),
      onSnapshot(
        query(
          DsaRef,
          where("email", "==", userEmail),
          where("difficulty", "==", "Medium")
        ),
        (snapshot) => {
          const updatedQuestions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGetMedium(updatedQuestions);
        }
      ),
      onSnapshot(
        query(
          DsaRef,
          where("email", "==", userEmail),
          where("difficulty", "==", "Hard")
        ),
        (snapshot) => {
          const updatedQuestions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGetHard(updatedQuestions);
        }
      ),
    ];

    return () => {
      unsubscribeAll.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return (
    <>
      <div class="mx-2 my-10 rounded-xl border bg-white px-4 shadow-md sm:mx-auto sm:max-w-xl sm:px-8">
        <div class="mb-2 flex flex-col gap-y-6 border-b py-8 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center">
            {user.reloadUserInfo.photoUrl ? (
              <img
                className="h-14 w-14 rounded-full object-cover"
                src={user.reloadUserInfo.photoUrl}
                alt={user.displayName}
              />
            ) : (
              <span class="inline-block size-[62px] bg-gray-100 rounded-full overflow-hidden">
                <svg
                  class="size-full text-gray-300"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.62854"
                    y="0.359985"
                    width="15"
                    height="15"
                    rx="7.5"
                    fill="white"
                  />
                  <path
                    d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            )}

            <div class="ml-4 w-56">
              <p class="text-slate-800 text-xl font-extrabold">
                {user.reloadUserInfo.displayName}
              </p>
              <p class="text-slate-500">{user.auth.currentUser.email}</p>
            </div>
          </div>
        </div>
        <div class="mb-2 flex justify-between border-b py-8 text-sm sm:text-base">
          <div class="flex flex-col items-center">
            <p class="text-slate-700 mb-1 text-xl font-extrabold">{count}</p>
            <p class="text-slate-500 text-sm font-medium">Total problems</p>
          </div>
          <div class="flex flex-col items-center">
            <p class="text-slate-700 mb-1 text-xl font-extrabold">{easy}</p>
            <p class="text-slate-500 text-sm font-medium">Easy</p>
          </div>
          <div class="flex flex-col items-center">
            <p class="text-slate-700 mb-1 text-xl font-extrabold">{medium}</p>
            <p class="text-slate-500 text-sm font-medium">Medium</p>
          </div>
          <div class="flex flex-col items-center">
            <p class="text-slate-700 mb-1 text-xl font-extrabold">{hard}</p>
            <p class="text-slate-500 text-sm font-medium">Hard</p>
          </div>
        </div>
        <div class="flex justify-between py-8">
          <Link
            to="/topics"
            class="text-slate-500 hover:bg-slate-100 rounded-lg border-2 px-4 py-2 font-medium focus:outline-none focus:ring"
          >
            View Topicwise
          </Link>
          <button
            onClick={handleAddProblem}
            class="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700"
          >
            Add Problem
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>
          <div className="relative m-10 max-w-lg rounded-md border bg-white shadow-lg">
            <p className="mt-4 pl-4 text-xl font-bold">Add Question</p>
            <svg
              onClick={handleCloseModal}
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-0 m-3 h-6 w-6 cursor-pointer text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div className="flex flex-col items-center px-8 py-10">
              <label className="block w-full" htmlFor="name">
                <p className="mb-1 text-sm text-gray-600">Add Question</p>
                <input
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                  type="text"
                  placeholder="Enter Question"
                />
              </label>
              <label className="mt-4 block w-full" htmlFor="name">
                <p className="mb-1 text-sm text-gray-600">Add Link</p>
                <input
                  onChange={(e) => setlink(e.target.value)}
                  className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                  type="email"
                  placeholder="Enter Link"
                />
              </label>
              <label className="mt-4 block w-full" htmlFor="name">
                <p className="mb-1 text-sm text-gray-600">Select Difficulty</p>
                <select
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </label>
              <label className="mt-4 block w-full">
                <p className="mb-1 text-sm text-gray-600">Select Topic</p>
                <select
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                >
                  <option value="Arrays">Arrays</option>
                  <option value="Strings">Strings</option>
                  <option value="Linked Lists">Linked Lists</option>
                  <option value="Stacks">Stacks</option>
                  <option value="Queues">Queues</option>
                  <option value="Trees">Trees</option>
                  <option value="Graphs">Graphs</option>
                  <option value="Dynamic Programming">
                    Dynamic Programming
                  </option>
                  <option value="Bit Manipulation">Bit Manipulation</option>
                  <option value="Recursion">Recursion</option>
                  <option value="Sorting">Sorting</option>
                  <option value="Searching">Searching</option>
                  <option value="Hashing">Hashing</option>
                  <option value="Greedy">Greedy</option>
                  <option value="Divide and Conquer">Divide and Conquer</option>
                  <option value="Backtracking">Backtracking</option>
                  <option value="Combinatorial Optimization">
                    Combinatorial Optimization
                  </option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Geometry">Geometry</option>
                  <option value="Game Theory">Game Theory</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </label>

              <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <button
                  onClick={addQuestion}
                  className="whitespace-nowrap rounded-md bg-blue-500 px-4 py-3 font-medium text-white"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {questions.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">
            No Questions found
          </h1>
          <p className="text-gray-500">Add questions to view them here</p>
        </div>
      ) : (
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h2 className="font-semibold text-gray-700">All Problems</h2>
              <span className="text-xs text-gray-500">
                View all problems you solved
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
                    <th className="px-5 py-3">Created At</th>
                    <th className="px-5 py-3">Actions</th>
                    <th className="px-5 py-3">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500">
                  {questions.map((question) => (
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
                        <p className="whitespace-no-wrap">{question.time}</p>
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

export default GetAllQuestions;
