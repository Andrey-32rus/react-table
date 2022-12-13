import React from 'react'
import Modal, { ModalProps } from 'react-bootstrap/Modal';

const ModalDialog: React.FC<ModalProps> = ({ children, ...props}) => {

  return (
    <Modal
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title>{children.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children.body}
      </Modal.Body>
      <Modal.Footer>
        {children.footer}
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDialog