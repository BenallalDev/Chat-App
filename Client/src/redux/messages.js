import { createSlice} from '@reduxjs/toolkit'
import { GetChat, GetMessages, GetUser, ReactToMessage, SearchUser, SendMessage } from './actions/messages'
import { useDispatch, useSelector } from 'react-redux'
const initialState = {
  messages: [],
  chat: [],
  searchLoading: false,
  messagesLoading: false,
  chatLoading: false,
  chatUser: {ussername: null, profilePic: null},

}


export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        recieve_message: (state, action) => {
            state.chat = [...state.chat, {him: action.payload, date: new Date().toString()}]
        }
    },
    extraReducers: builder => {
        builder
            .addCase(GetMessages.pending, (state, action) => {
                state.messagesLoading = true
            })
            .addCase(GetMessages.fulfilled, (state, action) => {
                state.messagesLoading = false
                state.messages = action.payload
            })
            .addCase(GetChat.pending, (state, action) => {
                state.chatLoading = true
            })
            .addCase(GetChat.fulfilled, (state, action) => {
                state.chatLoading = false
                state.chat = action.payload.chat
                state.room = action.payload.room
 
            })
            .addCase(SendMessage.fulfilled, (state, action) => {
                state.chat = action.payload
            })
            .addCase(SearchUser.pending, (state, action) => {
                state.searchLoading = true
            })
            .addCase(SearchUser.fulfilled, (state, action) => {
                state.searchLoading = false
            })
            .addCase(SearchUser.rejected, (state, action) => {
                state.searchLoading = false
            })
            .addCase(ReactToMessage.fulfilled, (state, action) => {
                state.chat = action.payload
            })
            .addCase(GetUser.pending, (state, action) => {
                state.chatLoading = true
            })
            .addCase(GetUser.fulfilled, (state, action) => {
                state.chatUser = action.payload
                state.chatLoading = false
            })
         
            
            
    }
})
export const { recieve_message } = messagesSlice.actions


export default messagesSlice.reducer