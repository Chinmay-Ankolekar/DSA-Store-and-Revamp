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
import { Timestamp } from "firebase/firestore";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const GetAllQuestions = ({ user }) => {
  const { topics } = useParams();
  console.log(topics);
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
      onSnapshot(
        query(
          DsaRef,
          where("email", "==", userEmail),
          where("topic", "==", topics)
        ),
        (snapshot) => {
          const updatedQuestions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setQuestions(updatedQuestions);
        }
      ),
      onSnapshot(
        query(
          DsaRef,
          where("email", "==", userEmail),
          where("topic", "==", topics),
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
          where("topic", "==", topics),
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
          where("topic", "==", topics),
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
      <Navbar />

      <div class="mx-auto my-20 grid max-w-screen-xl grid-cols-1 px-2 text-blue-800 sm:px-20 lg:grid-cols-3">
        <div class="col-span-1 flex flex-col justify-center text-center sm:text-left md:pr-10">
          <h1 class="mb-6 text-4xl">Things you'll learn</h1>
          <p class="text-blue-900">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero.
          </p>
          <div class="my-5">
            <Link to='/dashboard' class="relative mt-1 mr-1 rounded-lg border-2 border-blue-700 bg-blue-700 px-6 py-2 font-medium text-white transition hover:translate-y-1">
              <div class="-scale-x-100 absolute left-0 -bottom-10 inline-flex h-10 w-10 -rotate-12 text-blue-700"></div>
               Dashboard
            </Link>
            <Link
              to="/topics"
              class="ml-1 mt-4 rounded-lg border-2 border-blue-700 px-6 py-2 font-medium text-blue-700 transition hover:translate-y-1"
            >
              View Topicwise
            </Link>
          </div>
        </div>
        <div class="col-span-2 mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-blue-50 p-5 sm:p-10 md:grid-cols-2 lg:mt-0">
          <div class="relative flex gap-5">
            <div class="absolute -left-12 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-blue-200 sm:static sm:bg-transparent md:text-5xl">
              {count < 10 ? "0" + count : count}
            </div>
            <div class="">
              <h3 class="text-xl font-semibold">Total Problems Solved </h3>
              {/* <p class="text-blue-900 mt-3">Count: {count}</p> */}
            </div>
          </div>
          <div class="relative flex gap-5">
            <div class="absolute -left-12 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-blue-200 sm:static sm:bg-transparent md:text-5xl">
              {easy < 10 ? "0" + easy : easy}
            </div>
            <div class="">
              <h3 class="text-xl font-semibold">Easy Problems Solved</h3>
              {/* <p class="text-blue-900 mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit..
              </p> */}
            </div>
          </div>
          <div class="relative flex gap-5">
            <div class="absolute -left-12 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-blue-200 sm:static sm:bg-transparent md:text-5xl">
              {medium < 10 ? "0" + medium : medium}
            </div>
            <div class="">
              <h3 class="text-xl font-semibold">Medium Problems Solved</h3>
              {/* <p class="text-blue-900 mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit..
              </p> */}
            </div>
          </div>
          <div class="relative flex gap-5">
            <div class="absolute -left-12 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-blue-200 sm:static sm:bg-transparent md:text-5xl">
              {hard < 10 ? "0" + hard : hard}
            </div>
            <div class="">
              <h3 class="text-xl font-semibold">Hard Problems Solved</h3>
              {/* <p class="text-blue-900 mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit..
              </p> */}
            </div>
          </div>
        </div>
      </div>

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
                        {/* <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">
          {formatDate(question.time)}
        </p>
      </td> */}
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

      {getEasy.length === 0 ? (
        ""
      ) : (
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h2 className="font-semibold text-gray-700">Easy Problems</h2>
              <span className="text-xs text-gray-500">
                View Easy problems you solved
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
                  {getEasy
                    .slice()
                    .sort((a, b) => b.time.toMillis() - a.time.toMillis())
                    .map((easyQuestion) => (
                      <tr key={easyQuestion.id}>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="whitespace-no-wrap">
                                {easyQuestion.questions}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="whitespace-no-wrap">
                                {easyQuestion.topic}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <a
                              href={easyQuestion.Link}
                              className="whitespace-no-wrap text-blue-600 hover:text-blue-900"
                            >
                              Link
                            </a>
                          </div>
                        </td>
                        {/* <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">
                      {formatDate(easyQuestion.time)}
                    </p>
                  </td> */}
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <button
                            onClick={() => {
                              handleDelete(easyQuestion.id);
                            }}
                            className="text-red-400 whitespace-no-wrap hover:text-red-600"
                          >
                            Delete
                          </button>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              easyQuestion.difficulty === "Easy"
                                ? "bg-green-200 text-green-900"
                                : easyQuestion.difficulty === "Medium"
                                ? "bg-yellow-200 text-yellow-900"
                                : easyQuestion.difficulty === "Hard"
                                ? "bg-red-200 text-red-900"
                                : ""
                            }`}
                          >
                            {easyQuestion.difficulty}
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

      {/* Hard Problems */}
      {getHard.length === 0 ? (
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
                  {getHard
                    .slice()
                    .sort((a, b) => b.time.toMillis() - a.time.toMillis())
                    .map((hardQuestion) => (
                      <tr key={hardQuestion.id}>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="whitespace-no-wrap">
                                {hardQuestion.questions}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="whitespace-no-wrap">
                                {hardQuestion.topic}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <a
                              href={hardQuestion.Link}
                              className="whitespace-no-wrap text-blue-600 hover:text-blue-900"
                            >
                              Link
                            </a>
                          </div>
                        </td>
                        {/* <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">
                      {formatDate(hardQuestion.time)}
                    </p>
                  </td> */}
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <button
                            onClick={() => {
                              handleDelete(hardQuestion.id);
                            }}
                            className="text-red-400 whitespace-no-wrap hover:text-red-600"
                          >
                            Delete
                          </button>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              hardQuestion.difficulty === "Easy"
                                ? "bg-green-200 text-green-900"
                                : hardQuestion.difficulty === "Medium"
                                ? "bg-yellow-200 text-yellow-900"
                                : hardQuestion.difficulty === "Hard"
                                ? "bg-red-200 text-red-900"
                                : ""
                            }`}
                          >
                            {hardQuestion.difficulty}
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

      {/* Medium Problems */}
      {getMedium.length === 0 ? (
        ""
      ) : (
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h2 className="font-semibold text-gray-700">Medium Problems</h2>
              <span className="text-xs text-gray-500">
                View medium problems you solved
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
                  {getMedium
                    .slice()
                    .sort((a, b) => b.time.toMillis() - a.time.toMillis())
                    .map((mediumQuestion) => (
                      <tr key={mediumQuestion.id}>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="whitespace-no-wrap">
                                {mediumQuestion.questions}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="whitespace-no-wrap">
                                {mediumQuestion.topic}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <a
                              href={mediumQuestion.Link}
                              className="whitespace-no-wrap text-blue-600 hover:text-blue-900"
                            >
                              Link
                            </a>
                          </div>
                        </td>
                        {/* <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">
                      {formatDate(mediumQuestion.time)}
                    </p>
                  </td> */}
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <button
                            onClick={() => {
                              handleDelete(mediumQuestion.id);
                            }}
                            className="text-red-400 whitespace-no-wrap hover:text-red-600"
                          >
                            Delete
                          </button>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              mediumQuestion.difficulty === "Easy"
                                ? "bg-green-200 text-green-900"
                                : mediumQuestion.difficulty === "Medium"
                                ? "bg-yellow-200 text-yellow-900"
                                : mediumQuestion.difficulty === "Hard"
                                ? "bg-red-200 text-red-900"
                                : ""
                            }`}
                          >
                            {mediumQuestion.difficulty}
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
