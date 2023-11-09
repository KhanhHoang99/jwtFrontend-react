
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { updateCurrentUser, fetchGroup } from '../../services/userService';
import { toast } from 'react-toastify';
import _, { create } from "lodash"

function ModalEditUser(props) {

    const [userGroups, setUserGroups] = useState([]);
    

    const defaultUserData = {
        phone: props.dataModal.phone || '',
        username: props.dataModal.username || '',
        address: props.dataModal.address || '',
        sex: props.dataModal.sex || '',
        group: props.dataModal.groupId || '',
        userId: props.dataModal.id || '',
    }

    const validInputsDefault = {
        phone: true,
        username: true,
        address: true,
        sex: true,
        group: true
    }

    const [userData, setUserData] = useState(defaultUserData);
    const [validInput, setValidInput] = useState(validInputsDefault);

     useEffect(() => {
        setUserData(defaultUserData);
    }, [props.dataModal]); 
    

    useEffect(() => {
        setUserData(defaultUserData);
        getGroups();
    }, [])


    const getGroups = async() => {
        let res = await fetchGroup();
        if(res && res.data && res.data.data && res.data.data.length > 0){
            let groups = res.data.data;
            setUserGroups(groups);
            setUserData({...userData, group: groups[0].id})
        }
    }

    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    const checkValidateInputs = () => {

        setValidInput(validInputsDefault)

        let arr = ['phone', 'username', 'group', 'address', 'sex'];
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

    const handleConfirmUser = async () => {

        let check = checkValidateInputs();
        if(check === true) {
            let res = await updateCurrentUser(userData);

            if(res.data && res.data.errorCode === 0) {
                // close modal
                props.handleCloseModalEdit();
                props.getListUser();
                toast.success(res.data.message)
            }else {
                toast.error(`Error when update user`)
            }
        }
    }

    return (
        <>
            <Modal size='lg' show={props.showModalEdit} onHide={props.handleCloseModalEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                       
                        <div className="col-md-6">
                            <div className="form-group py-2">
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text" 
                                    value={userData.username} 
                                    className={validInput.username ? 'form-control' : 'form-control is-invalid'} 
                                    id="username" 
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
                                    value={userData.address || ''} 
                                    className={validInput.address ? 'form-control' : 'form-control is-invalid'} 
                                    id="address" 
                                    name="address" 
                                    placeholder="Enter your address"
                                    onChange={(e) => handleOnchangeInput(e.target.value, 'address')}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group py-2">
                                <label htmlFor="phone">Phone</label>
                                <input 
                                    type="text" 
                                    value={userData.phone || ''} 
                                    className={validInput.phone ? 'form-control' : 'form-control is-invalid'} 
                                    id="phone" 
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
                                value={userData.sex}
                            >
                                <option defaultValue value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">Group</label>
                            <select 
                                className="form-select py-2"
                                onChange={(e) => handleOnchangeInput(e.target.value, 'group')}
                                value={userData.group}
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
                    <Button variant="secondary" onClick={props.handleCloseModalEdit}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmUser}>
                        Update 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;