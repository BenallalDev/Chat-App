import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api"

export const GetMessages = createAsyncThunk(
    "messages/getMessages",
    async () => {
        try {
           const { data } = await api.APIgetMessages()
           return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)
export const GetChat = createAsyncThunk(
    "messages/chat",
    async (username) => {
        try {
            const { data } = await api.APIgetChat(username)
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const SendMessage = createAsyncThunk(
    "messages/sendMessage",
    async (info) => {
        try {
            const { username, message } = info
            const { data } = await api.APIsendMessage(username, message)
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)