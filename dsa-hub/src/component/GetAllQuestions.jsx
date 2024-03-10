import React, { useState, useEffect } from 'react';
import { collection, getDocs, where, query, deleteDoc, doc } from "firebase/firestore";
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
    }

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
    )
}

export default GetAllQuestions;

