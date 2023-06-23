import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomInvoiceModal(props) {
  var invoiceData = props.invoiceData;
  var invoiceID = invoiceData.id;
  var employeeName = invoiceData.employee_name;
  var productName = invoiceData.product_name;
  var clientName = invoiceData.client_name;
  var charge = invoiceData.charge;
  var dateOfService = invoiceData.date_of_service;
  var conciergeFeePaid = invoiceData.concierge_fee_paid;
  var gfe = invoiceData.gfe;
  var paidByClientCash = invoiceData.paid_by_client_cash;
  var paidByClientCredit = invoiceData.paid_by_client_credit;
  var personalDiscount = invoiceData.personal_discount;
  var tip = invoiceData.tip;
  var comments = invoiceData.comments;
  var overheadFeeType = invoiceData.overhead_fee_type;
  var overheadFeeValue = invoiceData.overhead_fee_value;
  return (
    <Modal
      {...props}
      // fullscreen="sm-down"
      dialogClassName="addwidth px-0 sm:px-2"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="my-invoice-modal">
        <Modal.Header className="modal-header-padding" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            InvoiceID: {invoiceID}
            <hr />
            Total: {charge}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center px-2 ">
          <form className="max-w-4xl mx-auto bg-white p-4 rounded-md">
            <div className=" border rounded-sm p-2 mb-4 flex justify-content-around">
              <div>
                <p className="text-sm md:text-base lg:text-lg">Provider:</p>
                <div>{employeeName}</div>
              </div>

              <div>
                <p className="text-sm md:text-base lg:text-lg">Client Name:</p>
                <div>{clientName}</div>
              </div>

              <div>
                <p className="text-sm md:text-base lg:text-lg">
                  Date of Service:
                </p>
                <div>{dateOfService}</div>
              </div>
            </div>

            <div className="border rounded-sm p-2 mb-4 flex justify-content-around">
              <div>
                <p className="text-sm md:text-base lg:text-lg">
                  Concierge Fee Paid:
                </p>
                <div>{conciergeFeePaid ? "Yes" : "No"}</div>
              </div>

              <div>
                <p className="text-sm md:text-base lg:text-lg">GFE:</p>
                <div>{gfe ? "Yes" : "No"}</div>
              </div>

              <div>
                <p className="text-sm md:text-base lg:text-lg">
                  Paid By Client Cash:
                </p>
                <div>{paidByClientCash}</div>
              </div>

              <div>
                <p className="text-sm md:text-base lg:text-lg">
                  Paid By Client Credit:
                </p>
                <div>{paidByClientCredit}</div>
              </div>

              <div>
                <p className="text-sm md:text-base lg:text-lg">
                  Total Paid by Client:
                </p>
                <div>{paidByClientCredit + paidByClientCash}</div>
              </div>
            </div>

            <div className=" border rounded-sm p-2 mb-4 flex justify-content-around">
              <div>
                <p className="text-sm md:text-base lg:text-lg">
                  Personal Discount:
                </p>
                <div>{personalDiscount}</div>
              </div>

              <div>
                <p className="text-sm md:text-base lg:text-lg">Tip:</p>
                <div>{tip}</div>
              </div>

              <div>
                <p className="text-sm md:text-base lg:text-lg">Comments:</p>
                <div>{comments}</div>
              </div>
            </div>

            <div className=" border rounded-sm p-2 mb-4 flex justify-content-around">
              <div>
                <p className="text-sm md:text-base lg:text-lg font-semibold">
                  Overhead:
                </p>
              </div>

              <div>
                <p className="text-sm md:text-base lg:text-lg">Fee Type:</p>
                <div>{overheadFeeType}</div>
              </div>

              <div>
                <p className="text-sm md:text-base lg:text-lg">Fee Value:</p>
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
