import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomInvoiceModal(props) {
    var invoiceData = props.invoiceData
    var invoiceID = invoiceData.id
    var employeeName =  invoiceData.employee_name
    var productName =  invoiceData.product_name
    var clientName =  invoiceData.client_name
    var charge = invoiceData.charge
    var dateOfService = invoiceData.dateOfService
    var conciergeFeePaid = invoiceData.conciergeFeePaid
    var gfe = invoiceData.gfe
    var paidByClientCash = invoiceData.paidByClientCash
    var paidByClientCredit = invoiceData.paidByClientCredit
    var paidByClientCredit = invoiceData.paidByClientCredit
    var paidByClientCash = invoiceData.paidByClientCash
    var personalDiscount = invoiceData.personalDiscount
    var tip = invoiceData.tip
    var comments = invoiceData.comments
    var overheadFeeType = invoiceData.overheadFeeType
    var overheadFeeValue = invoiceData.overheadFeeValue

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='my-invoice-modal'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        InvoiceID: {invoiceID}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <form class='max-w-4xl mx-auto bg-white p-4 rounded-md'>
                      <div class=' border rounded-sm p-2 mb-4 flex justify-content-around'>
                        <div>
                          <h4>Provider:</h4>
                          <div>{employeeName}</div>
                        </div>
                        
                        <div>
                          <h4>Client Name:</h4>
                          <div>{clientName}</div>
                        </div>
                
                        <div>
                          <h4>Date of Service:</h4>
                          <div>{dateOfService}</div>
                        </div>
                      </div>
                      

                      <div class=' border rounded-sm p-2 mb-4 flex justify-content-around'>
                        <div>
                          <h4>Concierge Fee Paid:</h4>
                          <div>{conciergeFeePaid ? 'Yes' : 'No'}</div>
                        </div>
                        
                        <div>
                          <h4>GFE:</h4>
                          <div>{gfe ? 'Yes' : 'No'}</div>
                        </div>
                        
                        <div>
                          <h4>Paid By Client Cash:</h4>
                          <div>{paidByClientCash}</div>
                        </div>
                        
                        <div>
                          <h4>Paid By Client Credit:</h4>
                          <div>{paidByClientCredit}</div>
                        </div>
                        
                        <div>
                          <h4>Total Paid by Credit:</h4>
                          <div>{paidByClientCredit + paidByClientCash}</div>
                        </div>
                      </div>

                      

                      <div class=' border rounded-sm p-2 mb-4 flex justify-content-around'>
                        <div>
                          <h4>Personal Discount:</h4>
                          <div>{personalDiscount}</div>
                        </div>
                        
                        <div>
                          <h4>Tip:</h4>
                          <div>{tip}</div>
                        </div>
                        
                        <div>
                          <h4>Comments:</h4>
                          <div>{comments}</div>
                        </div>
                      </div>

                      
                      <div class=' border rounded-sm p-2 mb-4 flex justify-content-around'>
                        <div>
                          <h4>Overhead:</h4>
                        </div>
                        
                        <div>
                          <h4>Fee Type:</h4>
                          <div>{overheadFeeType}</div>
                        </div>
                        
                        <div>
                          <h4>Fee Value:</h4>
                          <div>{overheadFeeValue}</div>
                        </div>
                      </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
}

export default CustomInvoiceModal;
