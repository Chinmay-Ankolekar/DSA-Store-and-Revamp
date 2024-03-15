import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";

const GetAllQuestions = ({ user }) => {
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

  const handleDelete = async (id) => {
    try {
      const DsaDoc = doc(db, "dsa", id);
      await deleteDoc(DsaDoc);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log(`Edit question with id ${id}`);
  };

  return (
    <>
      <div>
        <h1>All Questions {questions.length}</h1>
        <table>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Question</th>
              <th>Link</th>
              <th>Difficulty Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <td>{question.topic}</td>
                <td>{question.questions}</td>
                <td>
                  <a href={question.Link} className="text-blue-700">
                    Link
                  </a>
                </td>
                <td>{question.difficulty}</td>
                <td>
                  <button onClick={() => handleEdit(question.id)}>Edit</button>
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div class="flex items-center justify-between pb-6">
          <div>
            <h2 class="font-semibold text-gray-700">All Problems</h2>
            <span class="text-xs text-gray-500">
              View all problems you solved
            </span>
          </div>
          <div class="flex items-center justify-between">
            <div class="ml-10 space-x-8 lg:ml-40">
              {/* <select class="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-gray-700">
  <option value="all">All</option>
  <option value="easy">Easy</option>
  <option value="medium">Medium</option>
  <option value="hard">Hard</option>
</select> */}
              <select className="rounded-md border m-3 p-1 ">
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
      </div>
    </>
  );
};

export default GetAllQuestions;
