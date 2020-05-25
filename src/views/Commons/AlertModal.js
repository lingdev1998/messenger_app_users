import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AlertModal = props => {
    return (
        <div>
            <Modal isOpen={props.openModal} fade={false} centered={true} size="sm">
                <ModalHeader toggle={() => props.closeModal('CANCEL')}>{props.modalHead}</ModalHeader>
                <ModalBody>{props.modalBody}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => props.closeModal('OK')}>OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AlertModal;