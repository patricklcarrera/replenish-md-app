import React, { useEffect, useState } from "react";
import Header from "./Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Card, Modal, Table, Form } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import

const InventoryModal = ({
  showModal,
  setshowModal,
  inventoryList,
  updateQtySubmit,
  updateQtyInput,
  setUpdateQtyInput,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setshowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          EmployeeId: {inventoryList?.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center flex  flex-col gap-4">
        <div>
          <Table bordered hover responsive className="w-full text-center">
            <thead>
              <tr>
                <th>Product </th>
                <th>Quantity</th>
                {/* <th>Assign</th> */}
              </tr>
            </thead>

            <tbody>
              {inventoryList?.products_quantities?.map((data) => {
                return (
                  <tr key={data?.product.id}>
                    <td className="align-middle">
                      <div className="flex flex-col  gap-2">
                        <span>{data?.product?.name} </span>
                        {/* <span>Product Name: Product </span> */}
                      </div>
                    </td>
                    <td className="align-middle">
                      <Form className="flex flex-col gap-4">
                        <Form.Control
                          type="number"
                          defaultValue={data?.quantity}
                          onChange={(e) => {
                            setUpdateQtyInput({
                              ...updateQtyInput,
                              [data?.product?.id]: { quantity: e.target.value },
                            });
                          }}
                          min={1}
                          required
                        />
                      </Form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={updateQtySubmit}>Update</Button>
        <Button onClick={() => setshowModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const Inventory = ({ userProfile, employeeList }) => {
  const navigate = useNavigate();
  const [showModal, setshowModal] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  const [updateQtyInput, setUpdateQtyInput] = useState({});


  const updateQtySubmit = () => {
    setshowModal(false);
    confirmAlert({
      title: "Confirm to submit",
      message: `Are you sure to upate ${
        Object.keys(updateQtyInput).length
      } Product`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            if (Object.keys(updateQtyInput).length > 0) {
              fetch("/inventories/update", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...updateQtyInput,
                  employee_id: inventoryList?.id,
                }),
              })
                .then((res) => {
                  if (res.ok) {
                    toast.success("Updates Product Quantity Successfully.");
                    window.location.reload();
                  } else if (res.status == 404) {
                    res.json().then((json) => {
                      toast.error("Please provide a client.");
                    });
                  } else {
                    res.json().then((json) => {
                      toast.error("Failed to Update the Product Quantity");
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  toast.error("An error occured.");
                });
            }
            //  fetch("employees/" + employee.id + "/send_reset_password_link");
          },
        },
        {
          label: "No",
          onClick: () => {
            setshowModal(true);
            console.log("Click No");
          },
        },
      ],
    });
  };

  return (
    <>
      <Header userProfile={userProfile} />
      <InventoryModal
        inventoryList={inventoryList}
        showModal={showModal}
        setshowModal={setshowModal}
        updateQtySubmit={updateQtySubmit}
        updateQtyInput={updateQtyInput}
        setUpdateQtyInput={setUpdateQtyInput}
      />
      <div className="mt-5 flex justify-center flex-wrap gap-4">
        {employeeList?.map((list) => {
          return (
            <Card
              key={list.id}
              className="text-center w-[20rem] sm:w-[25rem]"
              border="info"
            >
              <Card.Header as="h5">Employee Id {list.id}</Card.Header>
              <Card.Body className="">
                <Card.Title className="mb-3">Employee: {list.name}</Card.Title>
              </Card.Body>
              <div className={`flex justify-center px-2 mb-2 gap-2`}>
                <Button
                  onClick={() => {
                    setInventoryList(list);
                    setshowModal(true);
                  }}
                  variant="info"
                >
                  See Inventories
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Inventory;
