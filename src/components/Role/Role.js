import React, { useEffect, useState } from 'react';
import "../Role/Role.scss";
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createRoles } from '../../services/roleService';
import TableRole from './TableRole';
import { useRef } from 'react';


function Role(props) {

    const dataChildDefault = {
         url: '', description: '', isValidUrl: true
    }

    const childRef = useRef();

    const [ listChilds, setListChilds] = useState({
        child1: dataChildDefault
    })

    const handleOnchangeInput = (name, value, key) => {

        let _listChilds = _.cloneDeep(listChilds);

        _listChilds[key][name] = value;

        if(value && name === 'url') {
            _listChilds[key][name] = value;
            _listChilds[key]['isValidUrl'] = true;
        }

        setListChilds(_listChilds);

    }


    const handleAddNewInput = () => {
        let id = uuidv4();
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[id] = dataChildDefault
        setListChilds(_listChilds);

    }

    const handleDeleteInput = (key) => {

        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key]
        setListChilds(_listChilds);

    }

    const buildDataToPerrsist = () => {

        let _listChilds = _.cloneDeep(listChilds);
        let result = [];

        Object.entries(_listChilds).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description
            })
        });

        return result;


    }

    const handleSave = async () => {
        // console.log(listChilds);
        let check = true;

        let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
            return child && !child.url;
        });

        if(!invalidObj) {

            let data = buildDataToPerrsist();
            let res = await createRoles(data);
            if(res && res.errorCode == 0) {
                toast.success(res.message)
                childRef.current.fetListRolesAgain();
                //loop throug object and clear state
            }

        }else {
            // console.log("invalidObj: ", invalidObj);
            const key = invalidObj[0];
            let _listChilds = _.cloneDeep(listChilds);
            _listChilds[key]['isValidUrl'] = false
            toast.error('Input Url must not be empty ...!')
            setListChilds(_listChilds);
        }

        if(check){

        }
    }

    return (
        <div className='role-container'>
            <div className='container'>
                <div className='mt-3'>
                    <div className='title-role'><h4>Add a new role</h4></div>
                    <div className='role-parent'>
                        {
                                Object.entries(listChilds).map(([key, child], index) => {
                                return (
                                    <div key={`child-${key}`} className='row role-child'>
                                        <div className='col-5 form-group'>
                                            <label>URL</label>
                                            <input type='text' 
                                                className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'} 
                                                defaultValue={child.url} 
                                                onChange={(e) => handleOnchangeInput('url', e.target.value, key)}
                                            />
                                        </div>
                                        <div className='col-5 form-group'>
                                            <label>Description</label>
                                            <input type='text' className='form-control' defaultValue={child.description} onChange={(e) => handleOnchangeInput('description', e.target.value, key)}/>
                                        </div>
                                        <div className='col-2 mt-4'>
                                            <button className='btn btn-primary' onClick={() => handleAddNewInput()}>Add</button>
                                            {index >= 1 && <button className='btn btn-danger' onClick={() => handleDeleteInput(key)}>Delete</button>}
                                        </div>
                                    </div>

                                )
                            })
                        }
                        <button type="button" className="btn btn-success" onClick={() => handleSave()}>Success</button>
                    </div>
                    <hr></hr>
                    <div className='title-role'><h4>List Current Roles</h4></div>
                    <TableRole ref={childRef}/>
                </div>
            </div>
        </div>
    );
}

export default Role;