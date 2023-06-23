import React, { useEffect, useState } from "react";
import { Button, Card, Form, OverlayTrigger, Popover } from "react-bootstrap";
import CustomEmployeeModel from "./CustomEmployeeModel";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";

export default function Employee({ employee, invoiceList }) {
  const [employeeInvoices, setEmployeeInvoices] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isResetHover, setIsResetHover] = useState(false);
  const [isUpdateHover, setIisUpdateHover] = useState(false);
  const [gfe, setGfe] = useState(employee?.gfe || false);
  const [percentage, setPercentage] = useState(employee?.percentage, 0);
  // console.log({ employee, invoiceList });
  useEffect(() => {
    const filteredInvoices = invoiceList.filter(
      (invoice) => invoice.employee.id === employee.id
    );
    setEmployeeInvoices(filteredInvoices);
  }, [invoiceList, employee]);

  function handleClick() {
    setModalShow(!modalShow);
  }

  function sendResetPasswordLink() {
    confirmAlert({
      title: "Confirm to submit",
      message: `Are you sure you want to send the reset password mail to ${employee.name}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch("employees/" + employee.id + "/send_reset_password_link");
          },
        },
        {
          label: "No",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  }

  function updateGfePercent() {
    fetch(`employees/${employee.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gfe, percentage, id: employee.id }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Employee has been updated successfully.");
          window.location.reload();
        } else if (res.status === 404) {
          res.json().then((json) => {
            toast.error("Please provide a client.");
          });
        } else {
          res.json().then((json) => {
            toast.error("Failed to update  Employee");
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occured.");
      });
  }

 
  const updatePopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Edit Employee</Popover.Header>
      <Popover.Body>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" readOnly disabled value={employee?.name} />
          <Form.Label className="mt-2">Email</Form.Label>
          <Form.Control type="text" readOnly disabled value={employee?.email} />
          <Form.Check
            className="mb-1"
            type={"checkbox"}
            id={`default-checkbox`}
            label={`GFE`}
            checked={gfe}
            onChange={(e) => setGfe(e.target.checked)}
          />
          <Form.Label className="mt-2">Percentage</Form.Label>
          <Form.Control
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(parseFloat(e.target.value))}
          />
          <br></br>
          <Button variant="primary" type="submit" onClick={updateGfePercent}>
            Submit
          </Button>
        </Form.Group>
      </Popover.Body>
    </Popover>
  );
  const tailWindEmployeeCard = (
    <Card className="text-center" border="info" style={{ width: "18rem" }}>
      <Card.Header as="h5">Employee Id {employee.id}</Card.Header>
      <Card.Body className="">
        <Card.Title className="mb-3">Employee: {employee.name}</Card.Title>
        {employeeInvoices.length > 0 ? (
          <Button onClick={handleClick} variant="info">
            Show Invoices
          </Button>
        ) : (
          <p>No Invoices</p>
        )}
        {employeeInvoices.length > 0 ? (
          <CustomEmployeeModel
            show={modalShow}
            onHide={handleClick}
            employeeInvoices={employeeInvoices}
            EmployeeId={employee.id}
          />
        ) : (
          <></>
        )}
      </Card.Body>
      <div className="flex justify-between px-4">
        <Button
          onClick={sendResetPasswordLink}
          variant="info"
          onMouseEnter={() => setIsResetHover(true)}
          onMouseLeave={() => setIsResetHover(false)}
          style={{
            width: isResetHover ? "150px" : "10px",
            height: isResetHover ? "45px" : "10px",
            marginLeft: "2%",
            marginBottom: "2%",
            fontSize: "12px",
          }}
        >
          {isResetHover ? "Send Password Reset Link" : ""}
        </Button>

        {employee?.is_admin === false && (
          // <Button
          //   onClick={updateGfePercent}
          //   variant="info"
          //   onMouseEnter={() => setIisUpdateHover(true)}
          //   onMouseLeave={() => setIisUpdateHover(false)}
          //   style={{
          //     width: isUpdateHover ? "150px" : "10px",
          //     height: isUpdateHover ? "45px" : "10px",
          //     marginLeft: "2%",
          //     marginBottom: "2%",
          //     fontSize: "12px",
          //   }}
          // >
          //   {isUpdateHover ? "Update" : ""}
          // </Button>

          <OverlayTrigger
            trigger="click"
            rootClose
            placement="bottom"
            overlay={updatePopover}
          >
            <Button
              // onClick={updateGfePercent}
              variant="info"
              onMouseEnter={() => setIisUpdateHover(true)}
              onMouseLeave={() => setIisUpdateHover(false)}
              style={{
                width: isUpdateHover ? "150px" : "10px",
                height: isUpdateHover ? "45px" : "10px",
                marginLeft: "2%",
                marginBottom: "2%",
                fontSize: "12px",
              }}
            >
              {isUpdateHover ? "Update" : ""}
            </Button>
          </OverlayTrigger>
        )}
      </div>
    </Card>
  );

  return (
    <div>{employeeInvoices ? tailWindEmployeeCard : <div>Loading</div>}</div>
  );
}
