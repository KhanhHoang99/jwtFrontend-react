import axios from 'axios';


const registerNewUser = (email, phone, userName, password) => {
    return axios.post('http://localhost:8080/api/v1/register', {
               email, phone, userName, password
            })
}

const loginUser = (email, password) => {
    return axios.post('http://localhost:8080/api/v1/login', {
               email, password
            })
}

const fetchAllUser = (page, limit) => {
    return axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`);
}

const deleteUser = (userId) => {
    return axios.delete(`http://localhost:8080/api/v1/user/delete?id=${userId}`);
}

const fetchGroup = () => {
    return axios.get(`http://localhost:8080/api/v1/group/read`);
}

const createNewUser = (userData) => {
    return axios.post(`http://localhost:8080/api/v1/user/create`, {...userData});
}



export {registerNewUser, loginUser, fetchAllUser, deleteUser, fetchGroup, createNewUser}