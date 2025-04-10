import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function Inicio() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Hazme click!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bienvenido julian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ya lo tienes todo preparado para comenzar la aventura en este pedazo de proyecto.
          <br />
          <br />
          Si deseas continuar agarrado a mi mano, por favor, acepta las condiciones de uso de <b>ElManueh</b> o <b>ElCutillas</b>.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Aceptar condiciones de ElManueh
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Aceptar condiciones de ElCutillas
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Inicio
