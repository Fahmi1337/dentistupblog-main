import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";



// creating functional component ans getting props from app.js and destucturing them
const StepFive = ({ nextStep, handleFormData, prevStep, values, addPost }) => {
  //creating error state for validation
  const [error, setError] = useState(false);

  // const { bloodPressure, lastName, age, email } = values;

  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
const patientReference = values.patientReference;
const dateOfBirth = values.dateOfBirth;
const reasonConsultation = values.reasonConsultation;
const gender = "hey";
const medicalHistory = values.medicalHistory;
const dailyMedications = values.dailyMedications;
const bloodPressure = values.bloodPressure;
const pulse = values.pulse;
const respiration = values.respiration;
const dentalHistory = values.dentalHistory;
const extraoralExamination = values.extraoralExamination;
const intraoralExamination = values.intraoralExamination;
const examenExoBuccal = values.examenExoBuccal;
const dermato = values.dermato;
const symetrieExplanation = values.symetrieExplanation;
const detailsRespiration = values.detailsRespiration;
const detailsMastication = values.detailsMastication;
const detailsDeglutition = values.detailsDeglutition;
const imageTest = values.imageTest;
const text = "test";
  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    addPost({ values });
    // checking if value of first name and last name is empty show error else take to next step
    if (validator.isEmpty(values.imageTest) 
    ) {
      setError(true);
    } else {
      // nextStep();
      addPost({ patientReference, dateOfBirth, reasonConsultation, gender, medicalHistory, dailyMedications, bloodPressure, pulse, respiration, dentalHistory, extraoralExamination, intraoralExamination, examenExoBuccal, dermato, symetrieExplanation, detailsRespiration, detailsMastication, detailsDeglutition, imageTest, text});
   
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Form onSubmit={submitFormData} className="form my-1">
            <Form.Group className="mb-3">
              <Form.Label>Image test</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="file" 
                name="imageTest"
                onChange={handleFormData("imageTest")}
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
              Submit
            </Button>
            </div>
           
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};


StepFive.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(StepFive);