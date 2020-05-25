import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Input
} from 'reactstrap';

const ConfirmModal = props => {
    return (
        <div>
            <Modal isOpen={props.openModal} fade={false} centered={true}>
                <ModalHeader toggle={() => props.closeModal('CANCEL')}>{props.modalHead}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input type="file" name="file" id="fileImport" />
                    </FormGroup>
                    <a href="https://github.com/jaredpalmer/formik" target="_blank">
                        Download template
                    </a>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => props.closeModal('OK')}>Import</Button>{' '}
                    <Button color="secondary" onClick={() => props.closeModal('CANCEL')}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ConfirmModal;