import React, { useEffect, useState } from 'react';
import "./Users.scss";
import {fetchAllUser, deleteUser} from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDeleteUser from '../Modals/ModalDeleteUser';

function Users(props) {

    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(2);
    const [totalPage, setTotalPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState({});

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

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

    const openModal = (user) => {
        // console.log('check: ', user)
        setShowModal(true);
        setDataModal(user)
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

        setShowModal(false);
    }

    return (
        <div className='manage-uers-container container'>
           <div className='user-header'>
                <h3>Table Users</h3>
                <div className='actions'>
                        <button>Hello</button>
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
                                    <button type="button" className="btn btn-danger" onClick={() => openModal(user)}>Delete</button>
                                    <span>  </span>
                                    <button type="button" className="btn btn-primary">Edit</button>
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
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleCloseModal={handleCloseModal}
                    handleShowModal={handleShowModal}
                    dataModal={dataModal}
                    handleDeleteUser={handleDeleteUser}

                />
            </>
        </div>
    );
};

export default Users;