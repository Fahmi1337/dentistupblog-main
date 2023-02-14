import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

// creating functional component ans getting props from app.js and destucturing them
const StepFour = ({ nextStep, handleFormData, prevStep, values, addPost }) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  const [item, setItem] = useState({ getGender: "" });

  // after form submit validating the form data using validator
  const { getSymetrie } = item;
  const handleChange = (e) => {
    e.persist();
    console.log(e?.target?.value);

    setItem((prevState) => ({
      ...prevState,
      getGender: e?.target?.value,
    }));
  };

  const submitFormData = (e) => {
    e.preventDefault();
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
    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values?.detailsRespiration) ||
      validator.isEmpty(values?.detailsMastication) ||
      validator.isEmpty(values?.detailsDeglutition)
    ) {
      setError(true);
    } else {
      // nextStep();
      addPost(values);
      // addPost({
      //   patientReference,
      //   dateOfBirth,
      //   reasonConsultation,
      //   gender,
      //   medicalHistory,
      //   dailyMedications,
      //   bloodPressure,
      //   pulse,
      //   respiration,
      //   dentalHistory,
      //   extraoralExamination,
      //   intraoralExamination,
      //   examenExoBuccal,
      //   dermato,
      //   symetrieExplanation,
      //   detailsRespiration,
      //   detailsMastication,
      //   detailsDeglutition,
      //   text,
      // });
      console.log("my data :", values);
    }
  };

  return (
    <div>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
          <Form onSubmit={submitFormData} className="form my-1">
            <Form.Label>Examen Fonctionnel </Form.Label>

            <Form.Group controlId="getATM" className="mb-3">
              <Form.Label>La Respiration </Form.Label>
              <div id="respirationChoices">
                <Form.Check
                  value="Nasal"
                  type="checkbox"
                  aria-label="Nasal"
                  label="Nasal"
                />
                <Form.Check
                  value="Buccal"
                  type="checkbox"
                  aria-label="Buccal"
                  label="Buccal"
                />
                <Form.Check
                  value="Mixte"
                  type="checkbox"
                  aria-label="Mixte"
                  label="Mixte"
                />
              </div>

              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Détails</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="detailsRespiration"
                defaultValue={values.detailsRespiration}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("detailsRespiration")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group controlId="getATM" className="mb-3">
              <Form.Label>La Mastication</Form.Label>
              <div id="masticationChoices">
                <Form.Check
                  value="Unilatéral"
                  type="checkbox"
                  aria-label="Unilatéral"
                  label="Unilatéral"
                />
                <Form.Check
                  value="Bi-latéral"
                  type="checkbox"
                  aria-label="Bi-latéral"
                  label="Bi-latéral"
                />
              </div>

              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Détails</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="detailsMastication"
                defaultValue={values.detailsMastication}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("detailsMastication")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group controlId="getATM" className="mb-3">
              <Form.Label>La Déglutition </Form.Label>
              <div id="deglutationChoices">
                <Form.Check
                  value="Typique"
                  type="checkbox"
                  aria-label="Typique"
                  label="Typique"
                />
                <Form.Check
                  value="Atypique"
                  type="checkbox"
                  aria-label="Atypique"
                  label="Atypique"
                />
              </div>

              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Détails</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="detailsDeglutition"
                defaultValue={values.detailsDeglutition}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("detailsDeglutition")}
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
    </div>
  );
};

StepFour.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(StepFour);
