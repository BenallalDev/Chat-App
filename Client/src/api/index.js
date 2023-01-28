import axios from "axios"

export const APIsignIn = (email, password) => axios.post('/api/signin', {email, password})
export const APIsignUp = (username, email, password) => axios.post('/api/signup', {username, email, password})
export const APIverify = (email, code) => axios.post(`/api/verify/${email}`, {code})
export const APIsendRecoveryLink = (email) => axios.post(`/api/sendrecoverylink`, {email})
export const APIcheckRecoveryLink = (email, code) => axios.post(`/api/checklink`, {email, code})
export const APIchangepassword = (email, code, password) => axios.post(`/api/changepassword`, {email, recoveryCode:code, newPassword:password})
export const APIcheckLogin = () => axios.get("/api/signin") 
export const APIlogout = () => axios.get("/api/logout")
export const APIgetMessages = () => axios.get("/api/messages")
export const APIgetChat = (username) => axios.get(`/api/chat/${username}`)
export const APIsendMessage = (username, message) => axios.post(`/api/messages/${username}`, {message})