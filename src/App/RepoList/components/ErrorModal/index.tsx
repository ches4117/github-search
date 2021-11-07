import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ErrorModalProps {
    error: string,
    showModal: boolean,
    handleModalClose: React.MouseEventHandler<HTMLButtonElement>,
  }

const ErrorModal: FC<ErrorModalProps> = ({
    error, showModal, handleModalClose
}) => {
    return (
        <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
      )
}

export default ErrorModal