import { User } from '../models/User.js';

 export const getUser = async (req, res) => {
    console.log('user model: ',typeof(req.user));
    const user = await User.findById(req.user).populate('friends.chatId', 'lastMessage timestamp').populate('friends.friendId').populate('requests.received').populate('requests.sent');

    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ user });
}

