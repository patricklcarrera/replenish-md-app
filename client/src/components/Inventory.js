import React, { useEffect, useState } from "react";
import Header from "./Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Card, Modal, Table, Form } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import AssignModal from "./AssignModal";

const Inventory = ({ userProfile, employeeList }) => {
  const navigate = useNavigate();
  const [showModal, setshowModal] = useState(false);
  const [productInfoInput, setproductInfoInput] = useState({});
  const [updateQtyInput, setUpdateQtyInput] = useState({});
  const [entireInventory, setEntireInventory] = useState([]);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);

  const [showAssignMadal, setShowAssignMadal] = useState(false);
  const [assignProductData, setAssignProductData] = useState({});
  const [assignInput, setAssignInput] = useState({
    quantity: 0,
  });

  useEffect(() => {
    fetch("/inventories")
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setEntireInventory(data);
      });
  }, []);

  const deleteSubmit = (product) => {
    confirmAlert({
      title: "Confirm to submit",
      message: `Are you sure to delete ${product.name} `,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(`/inventories/${product?.id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                if (res.ok) {
                  toast.success("Updated Product Quantity Successfully.");
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
            //  fetch("employees/" + employee.id + "/send_reset_password_link");
          },
        },
        {
          label: "No",
          onClick: () => {
            // setshowModal(true);
            console.log("Click No");
          },
        },
      ],
    });
  };

  const UpdateProductSubmit = (e) => {
    e.preventDefault();
    console.log({ productInfoInput });
    setShowUpdateProductModal(false);

    confirmAlert({
      title: "Confirm to submit",
      message: `Are you sure to Update ${productInfoInput.name} `,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(`/inventories/${productInfoInput?.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productInfoInput),
            })
              .then((res) => {
                if (res.ok) {
                  toast.success("Updates Product  Successfully.");
                  window.location.reload();
                } else if (res.status == 404) {
                  res.json().then((json) => {
                    toast.error("Please provide a client.");
                  });
                } else {
                  res.json().then((json) => {
                    toast.error("Failed to Update the Product ");
                  });
                }
              })
              .catch((error) => {
                console.error("Error:", error);
                toast.error("An error occured.");
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            setShowUpdateProductModal(true);
            console.log("Click No");
          },
        },
      ],
    });
  };

  const CreateProductSubmit = (e) => {
    e.preventDefault();
    console.log({ productInfoInput });
    setShowUpdateProductModal(false);

    confirmAlert({
      title: "Confirm to submit",
      message: `Are you sure to Create Product: ${productInfoInput.product_name} `,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(`/inventories`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productInfoInput),
            })
              .then((res) => {
                if (res.ok) {
                  toast.success(" Product Created  Successfully.");
                  window.location.reload();
                } else if (res.status == 404) {
                  res.json().then((json) => {
                    toast.error("Please provide a client.");
                  });
                } else {
                  res.json().then((json) => {
                    toast.error("Failed to Create the Product ");
                  });
                }
              })
              .catch((error) => {
                console.error("Error:", error);
                toast.error("An error occured.");
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            setShowUpdateProductModal(true);
            console.log("Click No");
          },
        },
      ],
    });
  };

  const assignSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...assignInput,
      product_name: assignProductData?.product.name,
    };

    fetch(`/inventories/${assignProductData?.id}/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...productData }),
    })
      .then((res) => {
        if (res.ok) {
            toast.success("Prompted Employee for the inventory.");
          setTimeout(() =>{
            window.location.reload();
          }, 1000);
        } else if (res.status == 404) {
          res.json().then((json) => {
            toast.error("Please provide a client.");
          });
        } else {
          res.json().then((json) => {
            toast.error("Failed to assign the inventory.");
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occured.");
      });
  };

  // console.log({showAssignMadal});
  return (
    <>
      <Header userProfile={userProfile} />
      <AssignModal
        showAssignMadal={showAssignMadal}
        setShowAssignMadal={setShowAssignMadal}
        assignSubmit={assignSubmit}
        assignProductData={assignProductData}
        setAssignProductData={setAssignProductData}
        employeeList={employeeList.filter((employee) => employee.id != userProfile.id)}
        setAssignInput={setAssignInput}
        assignInput={assignInput}
        employee={userProfile}
      />

      <Modal
        show={showUpdateProductModal}
        onHide={() => setShowUpdateProductModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Product Id: {productInfoInput?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex justify-between flex-col items-center gap-2">
          <div className="w-full">
            <Form
              className="flex flex-col gap-4"
              onSubmit={
                productInfoInput?.update
                  ? UpdateProductSubmit
                  : CreateProductSubmit
              }
            >
              <Form.Label style={{ marginBottom: "-1rem" }}>
                Product Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={` Type Product Name`}
                onChange={(e) =>
                  setproductInfoInput({
                    ...productInfoInput,
                    product_name: e.target.value,
                  })
                }
                defaultValue={productInfoInput?.product_name}
                required
              />
              <Form.Label style={{ marginBottom: "-1rem" }}>
                Product Type
              </Form.Label>
              <Form.Control
                type="text"
                value={productInfoInput?.product_type}
                placeholder={` Type Product Type`}
                onChange={(e) =>
                  setproductInfoInput({
                    ...productInfoInput,
                    product_type: e.target.value,
                  })
                }
                defaultValue={productInfoInput?.product_type}
                required
                label="Product Name"
              />
              <Form.Label style={{ marginBottom: "-1rem" }}>
                Product Quantity
              </Form.Label>
              <Form.Control
                type="number"
                value={productInfoInput?.quantity}
                placeholder={` Type Quantity `}
                onChange={(e) =>
                  setproductInfoInput({
                    ...productInfoInput,
                    quantity: e.target.value,
                  })
                }
                // max={productInfoInput?.maxQty}
                title={` You can select upto ${productInfoInput?.quantity} Quantity`}
                min={1}
                required
              />

              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowUpdateProductModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className=" container  mx-auto">
        <h2 className="text-4xl mt-8 font-bold text-center text-blue-400">
          Company Inventory
        </h2>
        <Table bordered hover responsive className="w-full mt-4 text-center">
          <thead>
            <tr>
              <th>Product </th>
              <th>Product Type </th>
              <th>Quantity</th>
              <th>Assign</th>
              <th className="flex justify-center items-center min-w-[11rem] md:w-auto"></th>
            </tr>
          </thead>
          <tbody>
            {entireInventory &&
              entireInventory?.map((data) => {
                return (
                  <tr key={data?.product?.id}>
                    <td className="align-middle">
                      <div className="flex flex-col  gap-2">
                        <span>
                          {data?.product?.name || "name is not entered"}{" "}
                        </span>
                        {/* <span>Product Name: Product </span> */}
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="flex flex-col  gap-2">
                        <span>
                          {data?.product?.product_type ||
                            "product_type is not entered"}{" "}
                        </span>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="flex flex-col   gap-2">
                        <span>{data?.quantity} </span>
                      </div>
                    </td>
                    <td className="align-middle">
                      <Button
                        variant="info"
                        onClick={() => {
                          setAssignProductData(data);
                          setShowAssignMadal(true);
                        }}
                      >
                        Assign
                      </Button>
                    </td>

                    <td className="align-middle flex  justify-around items-center">
                      <Button
                        variant="info"
                        onClick={() => {
                          console.log(data);

                          setproductInfoInput({
                            update: true,
                            quantity: data.quantity,
                            product_type: data?.product?.product_type,
                            product_name: data?.product?.name,
                            id: data?.product?.id,
                            maxQty: data?.quantity,
                          });
                          setShowUpdateProductModal(true);
                        }}
                        title="Edit Product"
                      >
                        Update
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteSubmit(data?.product);
                        }}
                        title="Delete Product"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <div
          className="my-10 container cursor-pointer mx-auto"
          onClick={() => {
            setShowUpdateProductModal(true);
            setproductInfoInput({
              ...productInfoInput,
              update: false,
            });
          }}
        >
          <div className="flex rounded-full items-center justify-start ">
            <p
              title="Add Product"
              className="text-2xl w-10 h-10 p-4  hover:bg-blue-500  bg-blue-400 flex rounded-full items-center justify-center  "
            >
              +
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
