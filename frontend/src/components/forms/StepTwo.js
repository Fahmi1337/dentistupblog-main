import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import teethNumbers from "../../img/deethNumbers.svg";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';
// creating functional component ans getting props from app.js and destucturing them


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "40em",
  bgcolor: 'background.paper',
textAlign: 'center',
  boxShadow: 24,
  p: 4,
};


const StepTwo = ({ nextStep, handleFormData, prevStep, values, editMode }) => {
  //creating error state for validation
  const [error, setError] = useState(false);

//Modal options
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step
    if (
      validator.isEmpty(values.medicalHistory) ||
      validator.isEmpty(values.dailyMedications) ||
      validator.isEmpty(values.bloodPressure) ||
      validator.isEmpty(values.pulse) ||
      validator.isEmpty(values.respiration) ||
      validator.isEmpty(values.dentalHistory) ||
      validator.isEmpty(values.extraoralExamination) ||
      validator.isEmpty(values.intraoralExamination) ||
      validator.isEmpty(values.concernedTeeth)
    ) {
      setError(true);
    } else {
      nextStep();
    }
  };
  return (
    <>
       <Card>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <img src={teethNumbers} alt="teeth" style={{width:"30em", textAlign: "center"}}/>
        </Box>
      </Modal>
        <Card.Body>
          <Form onSubmit={submitFormData} className="form my-1">
            <Form.Group className="mb-3">
              <Form.Label>Medical History</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("medicalHistory")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Daily medications</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("dailyMedications")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <div id="bloodPulseRespirationContainer">
              <Form.Group className="mb-3">
                <Form.Label>Blood Pressure</Form.Label>
                <Form.Control
                  style={{ border: error ? "2px solid red" : "" }}
                  type="text"
                  placeholder="Write something"
                  onChange={handleFormData("bloodPressure")}
                />
                {error ? (
                  <Form.Text style={{ color: "red" }}>
                    This is a required field
                  </Form.Text>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pulse</Form.Label>
                <Form.Control
                  style={{ border: error ? "2px solid red" : "" }}
                  type="text"
                  placeholder="Write something"
                  onChange={handleFormData("pulse")}
                />
                {error ? (
                  <Form.Text style={{ color: "red" }}>
                    This is a required field
                  </Form.Text>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Respiration</Form.Label>
                <Form.Control
                  style={{ border: error ? "2px solid red" : "" }}
                  type="text"
                  placeholder="Write something"
                  onChange={handleFormData("respiration")}
                />
                {error ? (
                  <Form.Text style={{ color: "red" }}>
                    This is a required field
                  </Form.Text>
                ) : (
                  ""
                )}
              </Form.Group>
            </div>


            <Form.Group className="mb-3">
              <Form.Label>Concerned theeth <Icon icon="fluent:info-24-regular" onClick={handleOpen} className="concernedTeethIconInfo"/></Form.Label>
              <small className="form-text">
            Please use comma separated values (eg. 3,13,18,30)
          </small>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("concernedTeeth")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Dental History</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("dentalHistory")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Extraoral Examination</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("extraoralExamination")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Intraoral Examination</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("intraoralExamination")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button variant="primary" onClick={prevStep}>
                Previous
              </Button>

              <Button variant="primary" type="submit">
                Continue
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepTwo;
