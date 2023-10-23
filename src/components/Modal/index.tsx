import Modal from 'react-bootstrap/Modal';

export function ModalContent(props) {
  console.log(props.data)
    return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered      
    >           
      <Modal.Body style={{padding:"0"}}>
        <img width="100%"  src={props.data?.localizacao_thumb || props.data} alt="" />
      </Modal.Body>
    
    </Modal>
  );
}

