import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const GetAllQuestions = ({user}) => {
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
console.log(questions);

return (
    <div>
        <h1>All Questions</h1>
        {
            questions.map((question) => (
                <div>
                    <h3>{question.topic}</h3>
                    <p>{question.questions}</p>
                    <a href={question.Link}>Link</a>
                    </div>
            ))
        }
    </div>
)
}

export default GetAllQuestions
