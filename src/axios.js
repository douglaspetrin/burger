import axios from 'axios';


// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});


// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = 'AUTH_TOKENdsadsadasdsadsa';

export default instance;