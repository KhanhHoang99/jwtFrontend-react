import React from 'react';
import { useState } from 'react';

import { fetAllRoles, deleteRole } from '../../services/roleService';
import { useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';

const TableRole = forwardRef((props, ref) => {

    const [listRoles, setListRoles] = useState([]);

    useEffect(() => {
        getAllRoles();
    }, [])


    useImperativeHandle(ref, () => ({

       fetListRolesAgain() {
            getAllRoles();
       }
    
      }));

    const getAllRoles = async () => {
        let data = await fetAllRoles();
        if(data && +data.errorCode === 0){
            setListRoles(data.roleList)
        }
        
    }

    const handleDeleteROLE = async (role) => {
        let data = await deleteRole(role.id);
        console.log('delete data: ', data)
        if(data && +data.errorCode === 0){
            toast.success('delete role success')
            getAllRoles();
        }
    }

    const handleEditRole = () => {
        
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Url</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {listRoles && listRoles.length > 0 && listRoles.map(role => (
                    <tr key={role.id}>
                        <th>{role.id}</th>
                        <td>{role.url}</td>
                        <td>{role.description}</td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => handleDeleteROLE(role)}>Delete</button>
                            <span>  </span>
                            <button type="button" className="btn btn-primary" onClick={() => handleEditRole(role)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
})

export default TableRole;