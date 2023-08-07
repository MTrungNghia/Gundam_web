import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true;

// axios.interceptors.response.use(resp => resp, error => {
//     if (error.response.status === 401) {
//         const response = axios.post('refresh/', {})
//             .then((rep) => {
//                 const token = rep.data.token;
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//             })
//             ;

//         if (response.status === 200) {
//             return axios(error.config);
//         }
//     }

//     return error
// });