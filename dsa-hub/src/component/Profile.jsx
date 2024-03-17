import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = ({ user }) => {
  const DsaRef = collection(db, "dsa");
  const userEmail = user.auth.currentUser.email;
  const [questions, setQuestions] = useState([]);
  const [getEasy, setGetEasy] = useState([]);
  const [getMedium, setGetMedium] = useState([]);
  const [getHard, setGetHard] = useState([]);
  const [leetcodeProfile, setLeetcodeProfile] = useState("");
  const [profile, setProfile] = useState(null);
  const [totalSolved, setTotalSolved] = useState(0);
  const [leeteasy, setEasy] = useState(0);
  const [leetmedium, setMedium] = useState(0);
  const [leethard, setHard] = useState(0);

  const addLeetcodeProfile = async () => {
    try {
      const docRef = await addDoc(collection(db, "leetcodeProfile"), {
        id: user.auth.currentUser.uid,
        profile: leetcodeProfile,
      });
      console.log("Document written with ID: ", docRef.id);
      setLeetcodeProfile("");
      alert("Profile added successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://leetcode-api-faisalshohag.vercel.app/${profile}`
      );
      const data = await res.json();
      console.log(data);
      console.log(data.totalSolved);
      console.log(data.matchedUserStats.acSubmissionNum[1].count);
      console.log(data.matchedUserStats.acSubmissionNum[2].count);
      console.log(data.matchedUserStats.acSubmissionNum[3].count);
      setTotalSolved(data.totalSolved);
      setEasy(data.matchedUserStats.acSubmissionNum[1].count);
      setMedium(data.matchedUserStats.acSubmissionNum[2].count);
      setHard(data.matchedUserStats.acSubmissionNum[3].count);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(db, "leetcodeProfile"),
            where("id", "==", user.auth.currentUser.uid)
          )
        );
        querySnapshot.forEach((doc) => {
          setProfile(doc.data());
        });
      } catch (e) {
        console.error("Error getting documents:", e);
      }
    };

    fetchProfile();
  }, [user.auth.currentUser.uid]);

  useEffect(() => {
    if (profile) {
      fetchData();
    }
  }, [profile]);

  let count = getEasy.length + getMedium.length + getHard.length;
  let easy = getEasy.length;
  let medium = getMedium.length;
  let hard = getHard.length;

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
      <Navbar />
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
          <Link
            to="/Dashboard"
            class="text-white bg-blue-600 rounded-lg border-2 px-4 py-2 font-medium focus:outline-none focus:ring"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
