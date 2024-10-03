import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["private", "group"],
        required: "Type is required",
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: "Members are required",
        },
    ],
    lastMessage: {
        messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
        content: {type: String},
        timestamp: {type: Date},
    },
    groupName: {
        type: String,
    },
    groupDesciption: {
        type: String,
    }    
});

export const Chat = mongoose.model("Chat", ChatSchema)