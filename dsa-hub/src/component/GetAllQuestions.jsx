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

  // const getQuestions = async () => {
  //   try {
  //     const querySnapshot = await getDocs(
  //       query(DsaRef, where("email", "==", userEmail))
  //     );
  //     const Questions = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     setQuestions(Questions);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const getEasyQuestion = async () => {
  //   try {
  //     const querySnapshot = await getDocs(
  //       query(
  //         DsaRef,
  //         where("email", "==", userEmail),
  //         where("difficulty", "==", "Easy"),
  //       )
  //     );
  //     const Questions = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setGetEasy(Questions);
  //     console.log(Questions, "Easy");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const getMediumQuestion = async () => {
  //   try {
  //     const querySnapshot = await getDocs(
  //       query(
  //         DsaRef,
  //         where("email", "==", userEmail),
  //         where("difficulty", "==", "Medium"),

  //       )
  //     );
  //     const Questions = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setGetMedium(Questions);
  //     console.log(Questions, "Medium");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const getHardQuestion = async () => {
  //   try {
  //     const querySnapshot = await getDocs(
  //       query(
  //         DsaRef,
  //         where("email", "==", userEmail),
  //         where("difficulty", "==", "Hard"),

  //       )
  //     );
  //     const Questions = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setGetHard(Questions);
  //     console.log(Questions, "Hard");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

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
            <img
              class="h-14 w-14 rounded-full object-cover"
              src={user.reloadUserInfo.photoUrl}
              alt="Simon Lewis"
            />
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
            <p className="mt-4 pl-4 text-xl font-bold">Add new user</p>
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
                  placeholder="Enter name"
                />
              </label>
              <label className="mt-4 block w-full" htmlFor="name">
                <p className="mb-1 text-sm text-gray-600">Add Link</p>
                <input
                  onChange={(e) => setlink(e.target.value)}
                  className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                  type="email"
                  placeholder="Enter email"
                />
              </label>
              <label className="mt-4 block w-full" htmlFor="name">
                <p className="mb-1 text-sm text-gray-600">Difficulty</p>
                <select
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </label>
              <label className="mt-4 block w-full" >
                <p className="mb-1 text-sm text-gray-600">Topic</p>
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

      {/* <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div class="flex items-center justify-between pb-6">
          <div>
            <h2 class="font-semibold text-gray-700">All Problems</h2>
            <span class="text-xs text-gray-500">
              View all problems you solved
            </span>
          </div>
          <div class="flex items-center justify-between">
            <div class="ml-10 space-x-8 lg:ml-40">
              <select   className="rounded-md border m-3 p-1 ">
                <option value="all">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>
        <div class="overflow-y-hidden rounded-lg border">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th class="px-5 py-3">Question</th>
                  <th class="px-5 py-3">Topic</th>
                  <th class="px-5 py-3">Link</th>
                  <th class="px-5 py-3">Created At</th>

                  <th class="px-5 py-3">Actions</th>
                  <th class="px-5 py-3">Difficulty</th>
                </tr>
              </thead>
              <tbody class="text-gray-500">
                {questions.map((question) => (
                  <tr>
                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <div class="flex items-center">
                        <div class="">
                          <p class="whitespace-no-wrap">{question.questions}</p>
                        </div>
                      </div>
                    </td>
                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <div class="flex items-center">
                        <div class="">
                          <p class="whitespace-no-wrap">{question.topic}</p>
                        </div>
                      </div>
                    </td>
                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <div class="flex items-center">
                        <a
                          href={question.Link}
                          class="whitespace-no-wrap text-blue-600 hover:text-blue-900"
                        >
                          Link
                        </a>
                      </div>
                    </td>
                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p class="whitespace-no-wrap">{question.time}</p>
                    </td>
                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <button
                        onClick={() => {
                          handleDelete(question.id);
                        }}
                        class="text-red-400 whitespace-no-wrap hover:text-red-600"
                      >
                        Delete
                      </button>
                    </td>

                    <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <span class="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                        {question.difficulty}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}

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
                {questions
          
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
                        <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
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
    </>
  );
};

export default GetAllQuestions;
