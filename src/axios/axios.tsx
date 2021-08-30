import axios from 'axios';
import { BASE_URL } from '../config/conf';
const instance = axios.create({ baseURL: BASE_URL });
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
instance.defaults.headers.common['token'] = localStorage.getItem('token') ? localStorage.getItem('token') : undefined;


export default instance