import React, { useEffect, useState } from 'react';
import "../Role/Role.scss";
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';


function Role(props) {

    const [ listChilds, setListChilds] = useState({
        child1: {id: 1, url: 'hêllll', description: 'lololo'}
    })

    const handleOnchangeInput = (name, value, key) => {

        let _listChilds = _.cloneDeep(listChilds);

        _listChilds[key][name] = value;
        setListChilds(_listChilds);

    }


    const handleAddNewInput = () => {
        let id = uuidv4();
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[id] = {
            url: '',
            description: ''
        }
        setListChilds(_listChilds);

    }

    const handleDeleteInput = (key) => {

        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key]
        setListChilds(_listChilds);

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
                                            <input type='text' className='form-control' defaultValue={child.url} onChange={(e) => handleOnchangeInput('url', e.target.value, key)}/>
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
                        <button type="button" className="btn btn-success">Success</button>
                    </div>
                 </div>
            </div>
        </div>
    );
}

export default Role;