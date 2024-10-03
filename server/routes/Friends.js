import express from 'express'
import { User } from '../models/User.js'
import { Chat } from '../models/Chat.js'
import { ObjectId } from 'mongodb';

const router = express.Router()

router.get('/find', async (req, res) => {
    console.log('req params: ',req.query);
    const friend = req.query.friend;
    console.log('friend: ',friend);
    console.log(typeof(friend));

    if (friend) {
        const isExistingUser = await User.findOne({
            $or: [
                { userName: { $regex: new RegExp(`^${friend}$`) } },
                    { email: { $regex: new RegExp(`^${friend}$`) } }
            ]
        })
        console.log('Existing User: ',isExistingUser);

        if (!isExistingUser){
            return res.status(401).json({
                status: "failed",
                data: [],
                message: "Invalid Email or Username",
            });
        }

        const {password, ...savedData} = isExistingUser._doc

        res.status(200).json({
            status: "success",
            data: [savedData],
            message: "User Found",
        })
    }

    else {
        res.status(401).json({
            status: "failed",
            data: [],
            message: "Friend field is required",
        })
    }

})

router.post('/sendfriendrequest', async (req, res) => {
    const { friend: friendUsername } = req.body;
    const userId = req.user;
    console.log(userId, typeof(userId));

    //finding the id of friend
    const friend = await User.findOne({ userName: friendUsername });
    const friendId = friend._id;

    console.log("friendId: ", friendId);

    const requestAlreadySent = await User.findOne(
            { _id: userId, 'requests.sent': friendId } 
    )

    if (requestAlreadySent) {
        return res.status(401).json({
            status: "failed",
            data: [],
            message: "Request Already Sent",
        })
    }

    console.log("requestAlreadySent: ", requestAlreadySent);


    //Finding the friend and updating the requests received field
    const updatedFriend = await User.findOneAndUpdate(
        { userName: friendUsername },
        { $push: { 'requests.received': userId } }, // Correctly use quotes around 'requests.received'
        { new: true } // Optional: returns the updated document
    );
    
    

    console.log("friend details: ", updatedFriend);

    //Finding the user and updating the requests sent field
    const user = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { 'requests.sent': friend._id } }, // Correctly use quotes around 'requests.sent'
        { new: true } // Optional: returns the updated document
    );

    console.log("user details: ", user);

    console.log("Friend Request Successfully Sent!")

    res.status(200).json({
        status: "success",
        data: [],
        message: "Friend Request Successfully Sent!",
    })

})

router.put('/removesentfriendrequest', async (req, res) => {
    const { friend: friendUsername } = req.body;
    const userId = req.user;

    console.log("user: ", userId);
    console.log("friend: ", friendUsername);

    //Finding the ID of the friend
    const friend = await User.findOne({ userName: friendUsername });
    const friendId = friend._id;

    console.log("friendId: ", friendId);

    //Finding the user and updating the requests sent field
    const updatedFriend = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { 'requests.sent': friendId } }, // Correctly use quotes around 'requests.received'
        { new: true } // Optional: returns the updated document
    );

    console.log("friend details: ", updatedFriend);

    //Finding the friend and updating the requests received field
    const user = await User.findOneAndUpdate(
        { _id: friendId },
        { $pull: { 'requests.received': userId } }, // Correctly use quotes around 'requests.sent'
        { new: true } // Optional: returns the updated document
    );

    console.log("Friend Request(Sent) Successfully Removed!")

    res.status(200).json({
        status: "success",
        data: [],
        message: "Friend Request(Sent) Successfully Removed!",
    })
})
router.put('/removereceivedfriendrequest', async (req, res) => {
    const { friend: friendUsername } = req.body;
    const userId = req.user;

    console.log("user: ", userId);
    console.log("friend: ", friendUsername);

    //Finding the ID of the friend
    const friend = await User.findOne({ userName: friendUsername });
    const friendId = friend._id;

    console.log("friendId: ", friendId);

    //Finding the user and updating the requests received field
    const updatedFriend = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { 'requests.received': friendId } }, // Correctly use quotes around 'requests.received'
        { new: true } // Optional: returns the updated document
    );

    console.log("friend details: ", updatedFriend);

    //Finding the friend and updating the requests sent field
    const user = await User.findOneAndUpdate(
        { _id: friendId },
        { $pull: { 'requests.sent': userId } }, // Correctly use quotes around 'requests.sent'
        { new: true } // Optional: returns the updated document
    );

    console.log("Friend Request(Received) Successfully Removed!")

    res.status(200).json({
        status: "success",
        data: [],
        message: "Friend Request(Received) Successfully Removed!",
    })
})


router.put('/addfriend', async (req, res) => {
    console.log("req body: ", req.body);

    const { friend: friendUsername } = req.body;
    const userId = req.user;

    console.log("user: ", userId);
    console.log("friend: ", friendUsername);
    
    //Finding the ID of the friend
    const friend = await User.findOne({ userName: friendUsername });
    const friendId = friend._id;
    const friendChatId = friend.chatId ? friend.chatId : null;

    console.log("friendId: ", friendId);
    console.log("friendChatId: ", friendChatId);

    //Checking if friend is already added
    const isExistingUser = await User.findById(userId);
    const friendsArray = isExistingUser.friends;
    console.log("user friends: ", friendsArray);
    const isFriendAlreadyAdded = friendsArray.some(friend => friend.friendId?.equals(friendId));
    console.log("isFriendAlreadyAdded: ", isFriendAlreadyAdded);

    if (isFriendAlreadyAdded) {
        return res.status(401).json({
            status: "failed",
            data: [],
            message: "Friend already added",
        })
    }

    //creating new chat between friends
    const newChat = new Chat({
        type: "private",
        members: [userId, friendId],
    });

    const savedChat = await newChat.save();
    console.log("savedChat: ", savedChat);




    const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { $push: { friends : { friendId: friendId ,chatId: savedChat._id} }  }, 
        {new: true}
    );

    //Adding the user as afriend to friend's list
    const isExistingUser1 = await User.findById(friendId);
    const friendsArray1 = isExistingUser1.friends;
    console.log("user friends: ", friendsArray1);
    const isFriendAlreadyAdded1 = friendsArray1.some(friend => friend.friendId?.equals(userId));
    console.log("isFriendAlreadyAdded: ", isFriendAlreadyAdded1);

    if (isFriendAlreadyAdded1) {
        return res.status(401).json({
            status: "failed",
            data: [],
            message: "Friend already added",
        })
    }

    const updatedUser1 = await User.findByIdAndUpdate(
        friendId, 
        { $push: { friends : { friendId: userId ,chatId: savedChat._id} }  }, 
        {new: true}
    );

    res.status(200).json({
        status: "success",
        data: [updatedUser],
        message: "New Friend Added",
    })
})

router.put('/removefriend', async (req, res) => {})

    

export default router