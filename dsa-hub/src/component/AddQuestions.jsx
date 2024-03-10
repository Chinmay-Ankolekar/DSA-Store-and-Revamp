import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState } from "react";

const AddQuestions = ({ user }) => {
  let navigate = useNavigate();
  const [questions, setQuestions] = useState("");
  const [Link, setLink] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const DsaRef = collection(db, "dsa");

  const addQuestion = async () => {
    try {
      const docRef = await addDoc(DsaRef, {
        email: user.auth.currentUser.email,
        time: user.metadata.creationTime,
        questions: questions,
        Link: Link,
        topic: topic,
        difficulty: difficulty,
      });
      console.log("Document written with ID: ", docRef.id);
      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <br />

      <input
        type="text"
        className="border"
        placeholder="Enter the topic"
        onChange={(e) => setTopic(e.target.value)}
      />
      <br />
      <input
        type="text"
        className="border"
        placeholder="Enter your question"
        onChange={(e) => setQuestions(e.target.value)}
      />
      <br />
      <input
        type="text"
        className="border"
        placeholder="Enter the link"
        onChange={(e) => setLink(e.target.value)}
      />
      <br />
      <select id="difficulty" value={difficulty} onChange={(e) => {setDifficulty(e.target.value)}}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="difficult">Difficult</option>
      </select>
      <button onClick={addQuestion}>Submit</button>
    </div>
  );
};

export default AddQuestions;
