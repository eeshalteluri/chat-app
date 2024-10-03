import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "Your firstname is required",
        max: 25,
    },
    lastName: {
        type: String,
        required: "Your lastname is required",
        max: 25,
    },
    email: {
        type: String,
        required: "Your email is required",
        unique: true,
        lowercase: true,
        trim: true,
    },
    userName: {
        type: String,
        required: "Your username is required",
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: "Your password is required",
        max: 25,
    },
    requests: {
        sent: {
            type: [Schema.Types.ObjectId], // Array of ObjectIds referring to 'User' model
            ref: 'User',
            default: []
        },
        received: {
            type: [Schema.Types.ObjectId], // Array of ObjectIds referring to 'User' model
            ref: 'User',
            default: []
        }
    },
    friends: {
        type: [{
        friendId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        chatId: {
            type: Schema.Types.ObjectId,
            ref: 'Chat'
        }
    }],
    default: [],
    _id: false
    },
    groups: {
        type: [{
        type: Schema.Types.ObjectId, 
        ref: 'GroupChat'
    }],
    default: [],
}
},
{ timestamps: true }
)


export const User = mongoose.model('User', UserSchema)


