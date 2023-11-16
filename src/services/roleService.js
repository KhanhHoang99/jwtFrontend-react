import React from 'react';
import axios from '../setup/axios';


const createRoles = (roles) => {
    return axios.post('/role/create', [...roles]);
}

const fetAllRoles = () => {
    return axios.get('/role/read');
}

const deleteRole = (roleId) => {
    return axios.delete(`/role/delete?id=${roleId}`);
}



export {createRoles, fetAllRoles, deleteRole}