import axios from '../setup/axios';

const registerNewUser = (email, phone, userName, password) => {
    return axios.post('/register', {
               email, phone, userName, password
            })
}

const loginUser = (email, password) => {
    return axios.post('/login', {
               email, password
            })
}

const fetchAllUser = (page, limit) => {
    return axios.get(`/user/read?page=${page}&limit=${limit}`);
}

const deleteUser = (userId) => {
    return axios.delete(`/user/delete?id=${userId}`);
}

const fetchGroup = () => {
    return axios.get(`/group/read`);
}

const createNewUser = (userData) => {
    return axios.post(`/user/create`, {...userData});
}


const updateCurrentUser = (userData) => {
    return axios.put(`http://localhost:8080/api/v1/user/update`, {...userData});
}


export {registerNewUser, loginUser, fetchAllUser, deleteUser, fetchGroup, createNewUser, updateCurrentUser}