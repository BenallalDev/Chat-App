import React, { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import SignIn from "./pages/signin";
import Signup from "./pages/signup";
import Messages from "./pages/messages";
import Chat from "./pages/chat";
import ForgotPassword from "./pages/forget";
import VerifyEmail from "./pages/verify";
import ResetPassword from "./pages/newPassword";
import { useDispatch, useSelector } from "react-redux";
import { CheckLogin } from "./redux/actions/auth";
import CheckLink from "./pages/checkLink";
function App() {
  const { loggedIn } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(CheckLogin())
  }, [])
  
  return (
    <Routes>
      {loggedIn ? <Route path="/" element={<Messages />} /> : <Route path="/" element={<SignIn />} />}
      {loggedIn ? <Route path="/chat/:username" element={<Chat />} /> : <Route path="/chat/:username" element={<Navigate to="/" />} />}
      {loggedIn ? <Route path="/signup" element={<Navigate to="/" />} /> : <Route path="/signUp" element={<Signup />} />}
      {loggedIn ? <Route path="/forgetPassword" element={<Navigate to="/" />} /> : <Route path="/forgot" element={<ForgotPassword />} />}
      {loggedIn ? <Route path="/verify/:email" element={<Navigate to="/" />} /> : <Route path="/verify/:email" element={<VerifyEmail />} />}
      {loggedIn ? <Route path="/changePassword" element={<Navigate to="/" />} /> : <Route path="/changePassword" element={<ResetPassword />} />}
      {loggedIn ? <Route path="/recover/:email/:code" element={<Navigate to="/" />} /> :<Route path="/recover/:email/:code" element={<CheckLink />} />}
      
      
      
    </Routes>
  );
}

export default App;
