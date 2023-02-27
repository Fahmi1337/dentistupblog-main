import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, handleFormData, values, setFormData }) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  const [gender, setGender] = useState({ getGender: "" });

  // after form submit validating the form data using validator
  const { getGender } = gender;
  const handleChange = (e) => {
    e.persist();
    console.log(e?.target?.value);

    setFormData((prevState) => ({
      ...prevState,
      ["gender"]: e?.target?.value,
    }));

    setGender((prevState) => ({
      ...prevState,
      getGender: e?.target?.value,
    }));
  };

  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values?.patientReference) ||
      validator.isEmpty(values?.dateOfBirth) ||
      validator.isEmpty(values?.title) ||
      validator.isEmpty(values?.description) ||
      validator.isEmpty(values?.reasonConsultation) ||
      getGender.length < 2
    ) {
      setError(true);
    } else {
      console.log("values", values);
      nextStep();
    }
  };

  return (
    <div>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
          <Form onSubmit={submitFormData} className="form my-1">
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="title"
                defaultValue={values.title}
                type="text"
                placeholder="Type an attractive title"
                onChange={handleFormData("title")}
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
              <Form.Label>Description</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="description"
                defaultValue={values.description}
                type="text"
                placeholder="Describe in brief the case"
                onChange={handleFormData("description")}
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
              <Form.Label>Patient Reference</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="patientReference"
                defaultValue={values.patientReference}
                type="text"
                placeholder="Patient #4561"
                onChange={handleFormData("patientReference")}
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
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="dateOfBirth"
                defaultValue={values.dateOfBirth}
                type="date"
                placeholder="Date of birth"
                onChange={handleFormData("dateOfBirth")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group
              controlId="getGender"
              className="mb-3"
              id="genderRadioboxContainer"
            >
              <Form.Label>Gender</Form.Label>
              <Form.Check
                value="male"
                type="radio"
                aria-label="male"
                label="Male"
                onChange={handleChange}
                checked={getGender === "male"}
              />
              <Form.Check
                value="female"
                type="radio"
                aria-label="female"
                label="Female"
                onChange={handleChange}
                checked={getGender === "female"}
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
              <Form.Label>Reason for consultation</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="reasonConsultation"
                defaultValue={values.reasonConsultation}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("reasonConsultation")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StepOne;
