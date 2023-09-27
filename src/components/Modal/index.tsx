import Modal from 'react-bootstrap/Modal';

export function ModalContent(props) {
    return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered      
    >           
      <Modal.Body style={{padding:"0"}}>
        <img width="100%"  src={props.data?.localizacao_thumb} alt="" />
      </Modal.Body>
    
    </Modal>
  );
}

