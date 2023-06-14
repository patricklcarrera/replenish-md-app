import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomInvoiceModal(props) {
    var invoiceData = props.invoiceData
    var invoiceID = invoiceData.id
    var employeeName =  invoiceData.employee_name
    var productName =  invoiceData.product_name
    var clientName =  invoiceData.client_name
    var charge = invoiceData.charge

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

export default CustomInvoiceModal;
