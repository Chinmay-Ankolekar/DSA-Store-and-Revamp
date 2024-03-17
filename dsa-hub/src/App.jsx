import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Dashboard from "./component/Dashboard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import GetQuestionsByTopic from "./component/GetQuestionsByTopic";
import TopicsPage from "./component/TopicsPage";
import Profile from "./component/Profile";
import Resource from "./component/Resource";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login user={user} />} />
        <Route path={"/signup"} element={<Signup />} />

        {user ? (
          <>
            <Route path={"/dashboard"} element={<Dashboard user={user} />} />
            <Route path={"/topics"} element={<TopicsPage user={user} />} />
            <Route
              path={"/topics/:topics"}
              element={<GetQuestionsByTopic user={user} />}
            />
            <Route path={"/profile"} element={<Profile user={user} />} />
            <Route path={"/resource"} element={<Resource user={user} />} />
          </>
        ) : (
          <>""</>
        )}
      </Routes>
    </>
  );
}

export default App;
