import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomEmployeeModal(props) {
    const { employeeInvoices } = props

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    EmployeeId: {props.EmployeeId}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                {employeeInvoices.map(data =>{
                        return <p key={data.id}>Invoice ID: {data.id} </p>
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CustomEmployeeModal;