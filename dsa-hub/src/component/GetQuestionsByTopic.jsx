import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { addDoc } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

const GetQuestionsByTopic = ({user}) => {
    const {topic} = useParams()
    const userEmail = user.auth.currentUser.email;

    const [questions, setQuestions] = useState([]);

    const [question, setQuestion] = useState("");
    const [Link, setLink] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");

    const DsaRef = collection(db, "dsa");

    
    
    const getQuestions = async () => {
        try {
            const querySnapshot = await getDocs(
                query(DsaRef, where("email", "==", userEmail), where("topic", "==", topic)
                )
            );
            const Questions = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setQuestions(Questions);
        } catch (error) {
            console.log(error.message);
        }
    }

  const addQuestion = async () => {
    try {
      const docRef = await addDoc(DsaRef, {
        email: userEmail,
        time: user.metadata.creationTime,
        questions: question,
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

  const handleDelete = async (id) => {
    try {
        const DsaDoc = doc(db, "dsa", id);
        await deleteDoc(DsaDoc);
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
};

    useEffect(() => {
        getQuestions();
    }, []);
    console.log(questions);

    return (
        <>
        <div>
            <h1>Topic: {topic}</h1>
            <h1>{topic} {questions.length}</h1>
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
                            <td><a href={question.Link} className="text-blue-700">Link</a></td>
                            <td>{question.difficulty}</td>
                            <td>
                                <button onClick={() => handleEdit(question.id)}>Edit</button>
                                <button onClick={() => handleDelete(question.id)} className="text-red-500">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <br />
      <input
        type="text"
        className="border"
        placeholder="Enter your question"
        onChange={(e) => setQuestion(e.target.value)}
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
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <button onClick={addQuestion}>Submit</button>
        </>
    )
}

export default GetQuestionsByTopic;