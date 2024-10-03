import axios from 'axios';

const getUser = async () => {
    const res = await axios.get('http://localhost:3000/api/v1/user', { withCredentials: true });
    console.log(res.data.user);
    return res.data.user;
}

export default getUser