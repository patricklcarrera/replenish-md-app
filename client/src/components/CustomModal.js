import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomModal(props) {
    var invoiceData = props.invoiceData
    var invoiceID = invoiceData.id
    var employeeName =  invoiceData.employee_name
    var productName =  invoiceData.product_name
    var clientName =  invoiceData.client_name
    var charge = invoiceData.charge
    var dateOfService = invoiceData.date_of_service
    var conciergeFeePaid = invoiceData.conciergeFeePaid
    var gfe = invoiceData.gfe
    var paidByClientCash = invoiceData.paid_by_client_cash
    var paidByClientCredit = invoiceData.paid_by_client_credit
    var personalDiscount = invoiceData.personal_discount
    var tip = invoiceData.tip
    var comments = invoiceData.comments
    var overheadFeeType = invoiceData.overhead_fee_type
    var overheadFeeValue = invoiceData.overhead_fee_value

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
                      <hr/>
                      Total: {charge}
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body className='text-center'>
                  <form className='max-w-4xl mx-auto bg-white p-4 rounded-md'>
                    <div className=' border rounded-sm p-2 mb-4 flex justify-content-around'>
                      <div>
                        <h9>Provider:</h9>
                        <div>{employeeName}</div>
                      </div>
                      
                      <div>
                        <h9>Client Name:</h9>
                        <div>{clientName}</div>
                      </div>
              
                      <div>
                        <h9>Date of Service:</h9>
                        <div>{dateOfService}</div>
                      </div>
                    </div>
                    
                    <div className='border rounded-sm p-2 mb-4 flex justify-content-around'>
                      <div>
                        <h9>Concierge Fee Paid:</h9>
                        <div>{conciergeFeePaid ? 'Yes' : 'No'}</div>
                      </div>
                      
                      <div>
                        <h9>GFE:</h9>
                        <div>{gfe ? 'Yes' : 'No'}</div>
                      </div>
                      
                      <div>
                        <h9>Paid By Client Cash:</h9>
                        <div>{paidByClientCash}</div>
                      </div>
                      
                      <div>
                        <h9>Paid By Client Credit:</h9>
                        <div>{paidByClientCredit}</div>
                      </div>
                      
                      <div>
                        <h9>Total Paid by Client:</h9>
                        <div>{paidByClientCredit + paidByClientCash}</div>
                      </div>
                    </div>

                    <div className=' border rounded-sm p-2 mb-4 flex justify-content-around'>
                      <div>
                        <h9>Personal Discount:</h9>
                        <div>{personalDiscount}</div>
                      </div>
                      
                      <div>
                        <h9>Tip:</h9>
                        <div>{tip}</div>
                      </div>
                      
                      <div>
                        <h9>Comments:</h9>
                        <div>{comments}</div>
                      </div>
                    </div>
                    
                    <div className=' border rounded-sm p-2 mb-4 flex justify-content-around'>                      
                      <div>
                        <h9>Overhead Fee Type:</h9>
                        <div>{overheadFeeType}</div>
                      </div>
                      
                      <div>
                        <h9>Overhead Fee Value:</h9>
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


export default CustomModal;
