import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userToken"))
  );

  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/chat"
          element={
            user ? (
              <Chat
                _id={user._id}
                email={user.email}
                username={user.username}
                token={user.token}
              />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
