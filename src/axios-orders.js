import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://doug-burger.firebaseio.com/'
});

export default instance;