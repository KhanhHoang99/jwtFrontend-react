import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDeleteUser(props) {



    return (
        <>
            <Modal show={props.showModal} onHide={props.handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete This User!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to delete {props.dataModal.email}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModal}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => {props.handleDeleteUser(props.dataModal)}}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;