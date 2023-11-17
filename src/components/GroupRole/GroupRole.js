import React, { useEffect, useState } from 'react';
import './GroupRole.scss'; 
import { fetchGroup } from '../../services/userService';
import { fetAllRoles, deleteRole, fetchRolesByGroup } from '../../services/roleService';
import _ from "lodash";


function GroupRole(props) {

    const [userGroups, setUserGroups] = useState([]);
    const [selectGroups, setSelectGroups] = useState("");
    const [listRoles, setListRoles] = useState([]);

    const [asignRolesByGroup, setAsignRolesByGroup] = useState([]);


    useEffect(() => {
        getGroups();
        getAllRoles();
    }, [])

    const getGroups = async() => {

        let res = await fetchGroup();

        if(res && res.data){
            let groups = res.data;
            setUserGroups(groups);
        }
    }

    const getAllRoles = async () => {
        let data = await fetAllRoles();
        if(data && +data.errorCode === 0){
            setListRoles(data.roleList)
        }
        
    }

    
    

    const handleOnchangeGroup = async (e) => {

      let groupId = e.target.value;
      setSelectGroups(groupId);

      if(groupId) {
        let data = await fetchRolesByGroup(+groupId);
        if(data && +data.errorCode === 0){
          
            // console.log('datagroup: ', data)
            // console.log('list roles: ', listRoles)

            let result = buildDataRolesByGroup(data.roles, listRoles);
            // console.log('result : ', result)

            setAsignRolesByGroup(result);

        }
       
      }
      
    }

    const buildDataRolesByGroup = (groupRoles, allRoles) => {

        let result = [];

        if(allRoles && allRoles.length > 0 ) {
            allRoles.map(role => {
                let object = {};
                object.url = role.url;
                object.id = role.id;
                object.description = role.description;
                object.isAssigned = false;

                if(groupRoles && groupRoles.length > 0) {
                    object.isAssigned  = groupRoles.some(item => item.url === object.url);
                }

                result.push(object);

            })
        }

        return result;
    }

    const handleSelectRole = (value) => {

        const _assignRolesByGroup = _.cloneDeep(asignRolesByGroup);
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id == value);
        
        if(foundIndex > -1){
            let isAssigned =  !_assignRolesByGroup[foundIndex].isAssigned
            _assignRolesByGroup[foundIndex] = {... _assignRolesByGroup[foundIndex], isAssigned}
            setAsignRolesByGroup(_assignRolesByGroup);
        }
    }

    return (
        <div className='group-role-container'>
            <div className='container'>
                <div className='mt-3'>
                    <h4>Group Role</h4>
                </div>
                <div className='assign-group-role'>
                    <select 
                        className="form-select py-2"
                        onChange={(e) => handleOnchangeGroup(e)}
                    >
                        <option value=''>Select Group</option>
                        {userGroups && userGroups.length > 0 && (
                            userGroups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))
                        )}
                    </select>
                </div>
                <hr/>
                {
                    selectGroups && 
                    <div className='roles'>
                        <h5>Assign Role</h5>
                        {asignRolesByGroup && asignRolesByGroup.length > 0 && asignRolesByGroup.map(role => (
                            <div className="form-check" key={role.id}>
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value={role.id}
                                    checked={role.isAssigned}
                                    onChange={(e) => handleSelectRole(e.target.value)}
                                    
                                    id={role.id} 
                                />
                                <label className="form-check-label"  htmlFor={role.id}>
                                    {role.url}
                                </label>
                            </div>
                        ))}
                        <div className='mt-3'>
                            <button className='btn btn-danger'>Save</button>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
}

export default GroupRole;