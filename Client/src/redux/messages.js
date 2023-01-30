import { createSlice} from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { GetChat, GetMessages, SendMessage } from './actions/messages'

const initialState = {
  messages: [],
  chat: [],
  messagesLoading: false,
  chatLoading: false
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
    }
})
export const { recieve_message } = messagesSlice.actions


export default messagesSlice.reducer