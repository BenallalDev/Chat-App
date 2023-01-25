
import React, { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import SignIn from "./pages/signin";
import Signup from "./pages/signup";
import Messages from "./pages/messages";
import Chat from "./pages/chat";
import ForgotPassword from "./pages/forget";
import VerifyEmail from "./pages/verify";
import ResetPassword from "./pages/newPassword";
function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  return (
    <Routes>
      {loggedIn ? <Route path="/" element={<Messages />} /> : <Route path="/" element={<SignIn />} />}
      {loggedIn ? <Route path="/chat/:username" element={<Chat />} /> : <Route path="/chat/:username" element={<Navigate to="/" />} />}
      {loggedIn ? <Route path="/signup" element={<Navigate to="/" />} /> : <Route path="/signUp" element={<Signup />} />}
      {loggedIn ? <Route path="/forgetPassword" element={<Navigate to="/" />} /> : <Route path="/forgetPassword" element={<ForgotPassword />} />}
      {loggedIn ? <Route path="/verify/:email" element={<Navigate to="/" />} /> : <Route path="/verify/:email" element={<VerifyEmail />} />}
      {loggedIn ? <Route path="/changePassword" element={<Navigate to="/" />} /> : <Route path="/changePassword" element={<ResetPassword />} />}
      
      
      
    </Routes>
  );
}

export default App;
