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
  const [topic, setTopic] = useState("");
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

  const handleAddProblem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addQuestion = async () => {
    try {
      const currentDate = new Date();
      const docRef = await addDoc(DsaRef, {
        email: user.auth.currentUser.email,
        time: Timestamp.fromDate(currentDate),
        questions: question,
        Link: link,
        topic: topics,
        difficulty: difficulty,
      });
      console.log("Document written with ID: ", docRef.id);
      setTopic("Arrays");
      setlink("");
      setQuestion("");
      setDifficulty("");
      alert("Question added successfully");
      setIsModalOpen(false);
    } catch (e) {
      console.error("Error adding document: ", e);
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
          <h1 class="mb-6 text-4xl">{topics}{ " " }({count<10 ? "0"+count:count})</h1>
          <p class="text-blue-900">
          {topics}: Store, Revise, and Master Your Solved Questions Easily.
          </p>
          <div class="my-5">
          <button
              onClick={handleAddProblem}
              class="relative mt-1 mr-1 rounded-lg border-2 border-blue-700 bg-blue-700 px-6 py-2 font-medium text-white transition hover:translate-y-1"
            >
              <div class="-scale-x-100 absolute left-0 -bottom-10 inline-flex h-10 w-10 -rotate-12 text-blue-700">
                <svg
                  viewBox="0 0 82 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 21.3963C0.189514 19.1422 0.475057 16.717 0.554355 14.2852C0.582363 13.435 0.32301 12.6326 1.24839 12.1517C1.43863 12.053 1.7169 11.8956 1.85767 11.9661C4.2446 13.1626 6.90906 13.1934 9.41312 13.8814C11.09 14.3423 12.6519 15.089 13.7134 16.5797C13.9251 16.8774 13.9105 17.3427 14 17.7305C13.6228 17.8077 13.2227 18.01 12.8727 17.9421C10.3283 17.4477 7.78825 16.9245 5.25946 16.353C4.46612 16.1737 4.32244 16.4862 4.22859 17.1961C4.0118 18.8342 3.66769 20.4541 3.43198 22.0899C3.33086 22.7891 3.36905 23.509 3.35123 24.2197C3.34977 24.2791 3.44107 24.3474 3.43052 24.3989C3.32213 24.9318 3.2712 25.8796 3.07114 25.9142C2.49387 26.0144 1.77655 25.8915 1.25603 25.5961C-0.352473 24.6832 0.143681 23.0129 0 21.3963Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M33.9279 29.9296C33.9687 30.0252 34.0103 30.1211 34.0512 30.2167L36.776 28.708C36.7189 28.6018 36.6613 28.4961 36.6041 28.3903C35.7123 28.9033 34.8197 29.4166 33.9279 29.9296ZM55.213 27.9357C55.2513 28.0076 55.2895 28.0795 55.3278 28.1513C56.8382 27.5018 58.3486 26.8518 59.8593 26.2019C59.8129 26.092 59.7661 25.9821 59.7197 25.8726C58.2175 26.5602 56.7153 27.2481 55.213 27.9357ZM40.7384 18.9565C40.5279 17.8215 40.3393 16.6815 40.0998 15.5525C39.952 14.8551 39.5106 14.6711 38.8099 14.825C36.6153 15.3082 34.9909 17.2686 34.7963 19.6189C34.584 22.1806 36.0472 23.7605 37.8517 25.1395C37.9927 25.2475 38.5155 25.0604 38.6986 24.8591C40.2045 23.1998 40.6396 21.163 40.7384 18.9565ZM47.8846 27.7513C53.9169 27.9699 58.9887 25.6539 63.5351 21.8258C68.7108 17.4677 72.7252 12.1435 76.2413 6.39113C77.3061 4.64903 78.3271 2.87833 79.4328 1.16371C79.7291 0.70344 80.2137 0.234515 80.706 0.0824723C81.0457 -0.0225277 81.5473 0.410268 81.9765 0.603333C81.8444 0.859247 81.7237 1.12306 81.5774 1.37032C81.1827 2.03645 80.7194 2.66758 80.3867 3.36306C79.3033 5.6264 78.3041 7.93113 77.1981 10.1824C76.4525 11.6998 75.639 13.1905 74.7457 14.6225C74.1814 15.5269 73.3694 16.269 72.7471 17.1414C71.7606 18.5237 70.9604 20.0611 69.8622 21.3395C68.1531 23.33 66.4111 25.3434 64.4139 27.0174C59.9989 30.718 54.9038 32.5263 49.0801 32.1605C46.3701 31.9904 43.6835 31.9283 41.122 30.8655C40.842 30.7492 40.3185 30.9333 40.0448 31.1527C37.2899 33.3656 34.1239 34.5277 30.6632 34.7456C28.0734 34.909 25.4198 35.1171 22.8828 34.7219C20.7546 34.3908 18.675 33.3742 16.7198 32.3694C14.9819 31.4756 13.3686 30.2773 11.8348 29.0418C9.65017 27.2812 8.09522 24.9795 7.06601 22.3556C6.91824 21.9789 7.17257 21.2819 7.46774 20.9267C7.79559 20.5315 8.26675 20.7212 8.80326 20.9647C10.4826 21.7271 11.1635 23.3172 12.0776 24.6916C13.809 27.2959 16.297 28.8333 19.144 29.6515C24.0015 31.0477 28.8342 30.4606 33.5239 28.7422C36.0572 27.8134 36.0323 27.708 34.1863 25.8643C31.7566 23.438 30.4122 20.5417 30.5982 17.0518C30.8143 13.0012 34.1347 10.1538 38.1338 10.4515C39.3892 10.5452 40.2439 11.3239 41.0648 12.1255C42.9294 13.9466 43.9712 16.2194 44.3347 18.7977C44.7112 21.4648 44.7806 24.1113 43.5286 26.6189C43.2264 27.2244 43.5171 27.489 44.1483 27.5187C45.3947 27.5778 46.6393 27.6719 47.8846 27.7513Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              Add Problem
            </button>
            <Link
              to="/topics"
              class="ml-1 mt-4 rounded-lg border-2 border-blue-700 px-6 py-2 font-medium text-blue-700 transition hover:translate-y-1"
            >
              View other topics
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
                              target="_blank"
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
