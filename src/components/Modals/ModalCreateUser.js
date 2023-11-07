import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { createNewUser, fetchGroup } from '../../services/userService';
import { toast } from 'react-toastify';
import _, { create } from "lodash"

function ModalCreateUser(props) {

    const [userGroups, setUserGroups] = useState([]);

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        address: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }

    const [userData, setUserData] = useState(defaultUserData);
    const [validInput, setValidInput] = useState(validInputsDefault);

    useEffect(() => {
        getGroups();
    }, [])

    const getGroups = async() => {
        let res = await fetchGroup();
        if(res && res.data && res.data.data && res.data.data.length > 0){
            let groups = res.data.data;
            setUserGroups(groups);
            setUserData({...userData, group: groups[0].id, sex: 'Male'})
        }
    }

    const checkValidateInputs = () => {

        setValidInput(validInputsDefault)

        let arr = ['email', 'address', 'phone', 'password', 'group', 'sex'];
        let check = true;

        for(let i = 0;i < arr.length; i++){
            
            if(!userData[arr[i]]){

                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInput(_validInputs);

                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }

        return check;
    }

    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }


    const handleConfirmUser = async () => {

        console.log('userData: ', userData)

        let check = checkValidateInputs();
        if(check === true) {
            let res = await createNewUser(userData);
            console.log('check respone: ', res)

            if(res.data && res.data.errorCode === 0) {
                // close modal
                toast.success(res.data.message)
                props.handleCloseModalCreate();
            }else {
                toast.error(`Error create user...`)
            }
        }
    }

    return (
        <>
            <Modal size='lg' show={props.showModalCreate} onHide={props.handleCloseModalCreate}>
                <Modal.Header closeButton>
                    <Modal.Title> Create User!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group py-2">
                                <label htmlFor="email">Email address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className={validInput.email ? 'form-control' : 'form-control is-invalid'} 
                                    name="email" 
                                    placeholder="Enter email"
                                    onChange={(e) => handleOnchangeInput(e.target.value, 'email')}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group py-2">
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text" 
                                    id="username"
                                    className={validInput.username ? 'form-control' : 'form-control is-invalid'}  
                                    name="username" 
                                    placeholder="Enter username"
                                    onChange={(e) => handleOnchangeInput(e.target.value, 'username')}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group py-2">
                                <label htmlFor="address">Address</label>
                                <input 
                                    type="text"                                    
                                    id="address"
                                    className={validInput.address ? 'form-control' : 'form-control is-invalid'} 
                                    name="address" 
                                    placeholder="Enter your address"
                                    onChange={(e) => handleOnchangeInput(e.target.value, 'address')}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group py-2">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password"                                    
                                    id="password"
                                    className={validInput.password ? 'form-control' : 'form-control is-invalid'} 
                                    name="password" 
                                    placeholder="Enter your password"
                                    onChange={(e) => handleOnchangeInput(e.target.value, 'password')}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group py-2">
                                <label htmlFor="phone">Phone</label>
                                <input 
                                    type="text"                                                                
                                    id="phone"
                                    className={validInput.phone ? 'form-control' : 'form-control is-invalid'}  
                                    name="phone" 
                                    placeholder="Enter phone"
                                    onChange={(e) => handleOnchangeInput(e.target.value, 'phone')}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">Gender</label>
                            <select 
                                className="form-select py-2"
                                onChange={(e) => handleOnchangeInput(e.target.value, 'sex')}
                                defaultValue="Male"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">Group</label>
                            <select 
                                className="form-select py-2"
                                onChange={(e) => handleOnchangeInput(e.target.value, 'group')}
                            >
                              {userGroups && userGroups.length > 0 && (
                                    userGroups.map((group) => (
                                        <option key={group.id} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModalCreate}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmUser}>
                        Confirm  
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;