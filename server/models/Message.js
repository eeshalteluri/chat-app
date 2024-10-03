import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: "Chat is required",
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: "Sender is required",
    },
    content: {
        type: String,
        required: "Content is required",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    ReadBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
})


export const Message = mongoose.model('Message', MessageSchema)