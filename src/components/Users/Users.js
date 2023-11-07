import React, { useEffect, useState } from 'react';
import "./Users.scss";
import {fetchAllUser, deleteUser} from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDeleteUser from '../Modals/ModalDeleteUser';
import ModalEditUser from '../Modals/ModalEditUser';
import ModalCreateUser from '../Modals/ModalCreateUser';

function Users(props) {

    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(4);
    const [totalPage, setTotalPage] = useState(1);

    //Model delete
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataModalDelete, setDataModalDelete] = useState({});
    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => setShowModalDelete(true);

    const openModalDelete = (user) => {
        // console.log('check: ', user)
        setShowModalDelete(true);
        setDataModalDelete(user)
    }

    const handleDeleteUser = async (user) => {
        try {
            let response = await deleteUser(user.id);
            console.log("response: " , response.data )
            if(response &&  response.data && response.data.errorCode === 0) {
                toast.success(response.data.message);
                getListUser();
            }else{
                toast.error(response.message);
            }
            
        } catch (error) {
            console.log("Error when delete user: ", error)
            toast.error("Error when delete user");
        }

        setShowModalDelete(false);
    }



    // Modal Edit
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [dataModalEdit, setDataModalEdit] = useState({});
    const handleCloseModalEdit = () => setShowModalEdit(false);
    const handleShowModalEdit = () => setShowModalEdit(true);

    const openModalEdit = (user) => {
        // console.log('check: ', user)
        setShowModalEdit(true);
        setDataModalEdit(user)
    }

    

    // Modal Create User
    const [showModalCreate, setShowModalCreate] = useState(false);
    const handleCloseModalCreate = () => setShowModalCreate(false);
    const handleShowModalCreate = () => setShowModalCreate(true);




    const getListUser = async () => {
        try {
            let response = await fetchAllUser(currentPage, currentLimit);
            if (response && response.data) {
                // console.log(response.data);
                setListUsers(response.data.data.userList);
                setTotalPage(response.data.data.totalPage)
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getListUser();
    }, [currentPage]);

    const handlePageClick = (event) => {

        // console.log('event.selected: ', event.selected)
        let page = +event.selected + 1;
        setCurrentPage(page)
    };


    

    return (
        <div className='manage-uers-container container'>
           <div className='user-header'>
                <h3>Table Users</h3>
                <div className='actions'>
                    <button 
                        type="button" 
                        className="btn btn-success"
                        onClick={() => setShowModalCreate(true)}
                    >Create a new user</button>
                </div>
           </div>
           <div className='user-body'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Sex</th>
                            <th scope="col">Group</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers && listUsers.length > 0 && listUsers.map(user => (
                            <tr key={user.id}>
                                <th>{user.id}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.sex ? user.sex : "N/A"}</td>
                                <td>{user.Group ? user.Group.name : "N/A"}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => openModalDelete(user)}>Delete</button>
                                    <span>  </span>
                                    <button type="button" className="btn btn-primary" onClick={() => openModalEdit(user)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='user-footer'>
                {
                    totalPage && totalPage > 0 &&
                    <>
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPage}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </>
                }
            </div>
            <>
                <ModalDeleteUser
                    showModal={showModalDelete}
                    setShowModal={setShowModalDelete}
                    handleCloseModal={handleCloseModalDelete}
                    handleShowModal={handleShowModalDelete}
                    dataModal={dataModalDelete}
                    handleDeleteUser={handleDeleteUser}

                />

                <ModalEditUser 
                    showModalEdit={showModalEdit}
                    setShowModalEdit={setShowModalEdit}
                    handleCloseModalEdit={handleCloseModalEdit}
                    handleShowModalEdit={handleShowModalEdit}
                    dataModal={dataModalEdit}
                />

                <ModalCreateUser
                    showModalCreate={showModalCreate}
                    setShowModalEdit={setShowModalCreate}
                    handleCloseModalCreate={handleCloseModalCreate}
                    handleShowModalCreate={handleShowModalCreate}
                />
                
            </>
        </div>
    );
};

export default Users;