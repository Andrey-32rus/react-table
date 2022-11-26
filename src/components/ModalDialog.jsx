import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalDialog({ children, ...props}) {

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
