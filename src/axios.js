import axios from "axios";

// axios.defaults.baseURL = 'https://v-back.herokuapp.com'
axios.defaults.baseURL = 'http://localhost:6699'
// axios.defaults.baseURL = 'http://videokurs.uz:6699'

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
