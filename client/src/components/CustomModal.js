import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomModal(props) {
  var invoiceData = props.invoiceData;
  var invoiceID = invoiceData.id;
  var employeeName = invoiceData.employee_name;
  var productName = invoiceData.product_name;
  var clientName = invoiceData.client_name;
  var charge = invoiceData.charge;
  var dateOfService = invoiceData.date_of_service;
  var conciergeFeePaid = invoiceData.conciergeFeePaid;
  var gfe = invoiceData.gfe;
  var paidByClientCash = invoiceData.paid_by_client_cash;
  var paidByClientCredit = invoiceData.paid_by_client_credit;
  var personalDiscount = invoiceData.personal_discount;
  var tip = invoiceData.tip;
  var comments = invoiceData.comments;
  var overheadFeeType = invoiceData.overhead_fee_type;
  var overheadFeeValue = invoiceData.overhead_fee_value;
  let show = props.show;
  let onHide = props.onHide;

  // console.log({ show, onHide });
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="my-invoice-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            InvoiceID: {invoiceID}
            <hr />
            Total: {charge}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <form className="max-w-4xl mx-auto bg-white p-4 rounded-md">
            <div className=" border rounded-sm p-2 mb-4 flex justify-content-around">
              <div>
                <p>Provider:</p>
                <div>{employeeName}</div>
              </div>

              <div>
                <p>Client Name:</p>
                <div>{clientName}</div>
              </div>

              <div>
                <p>Date of Service:</p>
                <div>{dateOfService}</div>
              </div>
            </div>

            <div className="border rounded-sm p-2 mb-4 flex justify-content-around">
              <div>
                <p>Concierge Fee Paid:</p>
                <div>{conciergeFeePaid ? "Yes" : "No"}</div>
              </div>

              <div>
                <p>GFE:</p>
                <div>{gfe ? "Yes" : "No"}</div>
              </div>

              <div>
                <p>Paid By Client Cash:</p>
                <div>{paidByClientCash}</div>
              </div>

              <div>
                <p>Paid By Client Credit:</p>
                <div>{paidByClientCredit}</div>
              </div>

              <div>
                <p>Total Paid by Client:</p>
                <div>{paidByClientCredit + paidByClientCash}</div>
              </div>
            </div>

            <div className=" border rounded-sm p-2 mb-4 flex justify-content-around">
              <div>
                <p>Personal Discount:</p>
                <div>{personalDiscount}</div>
              </div>

              <div>
                <p>Tip:</p>
                <div>{tip}</div>
              </div>

              <div>
                <p>Comments:</p>
                <div>{comments}</div>
              </div>
            </div>

            <div className=" border rounded-sm p-2 mb-4 flex justify-content-around">
              <div>
                <p>Overhead Fee Type:</p>
                <div>{overheadFeeType}</div>
              </div>

              <div>
                <p>Overhead Fee Value:</p>
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
