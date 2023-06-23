import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "./Header";
import { Button, Card } from "react-bootstrap";
import CustomInvoiceModal from "./CustomInvoiceModal.js";

function UserPage({ userProfile }) {
  const [employee, setEmployee] = useState();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [invoiceData, setinvoiceData] = useState(null);
  console.log(JSON.stringify(invoiceData, null, 2));
  function handleClick(invoice) {
    // setinvoiceData();
    setModalShow(!modalShow);
  }

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetch(`/employees/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((employee) => {
          setEmployee(employee);
          setLoading(false);
        });
      } else {
        res.json().then((data) => setErrors(data.error));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Header></Header>;
  if (errors) return <h1>{errors}</h1>;

  return (
    <div>
      <Header userProfile={userProfile} />

      {/* showing the modal once */}
      {modalShow && (
        <CustomInvoiceModal
          show={modalShow}
          onHide={handleClick}
          invoiceData={invoiceData}
          // show={true}
        />
      )}
      <br />
      <h1 className="text-4xl font-bold text-center text-blue-600">
        {employee.name}
      </h1>
      <br />
      <h2 className="text-4xl font-bold text-center text-blue-400">
        My invoices
      </h2>
      <br />
      <ul className=" mx-1 mb-3 justify-center flex flex-wrap gap-3 ">
        {employee.invoices.map((invoice) => {
          // console.log({ invoice });
          return (
            <li key={invoice.id}>
              <Card
                className="text-center"
                border="info"
                style={{ width: "18rem" }}
              >
                <Card.Header as="h5">Invoice ID {invoice.id}</Card.Header>
                <Card.Body className="">
                  <Button
                    onClick={async () => {
                      await setinvoiceData(invoice);
                      handleClick();
                    }}
                    variant="info"
                  >
                    See More Details
                  </Button>
                </Card.Body>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UserPage;
