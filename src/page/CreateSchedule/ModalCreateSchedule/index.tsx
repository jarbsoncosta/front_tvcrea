import Modal from 'react-bootstrap/Modal';

export function ModalCreateSchedule(props) {
  console.log(props.data)
    return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered      
    >           
      <Modal.Body style={{padding:"0"}}>
      <div style={{padding:"1rem"}}>
      <button onClick={()=>(props.close(false))}>fechar</button>
        <img width="100%"  src={props.data?.localizacao_thumb} alt="" />
        <strong>Enviar Lista de videos para programação</strong>
        <input type="date" />
        <input type="text" />
      </div>
      </Modal.Body>
    
    </Modal>
  );
}

