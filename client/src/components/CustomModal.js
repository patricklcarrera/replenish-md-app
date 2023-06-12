import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomModal(props) {
    const { invoiceData } = props
    const invoiceID = invoiceData.id
    const employeeName =  invoiceData.employee.name
    const productName =  invoiceData.product.name
    const clientName =  invoiceData.client.name
    const charge = invoiceData.charge

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    InvoiceID: {invoiceID}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <h4>Employee Name: {employeeName}</h4>
                <p>Product Name: {productName} </p>
                <p> ClientName: {clientName} </p>
                <p>Charge: {charge} </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default CustomModal;