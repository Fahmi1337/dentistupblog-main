import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepThree = ({
  nextStep,
  handleFormData,
  prevStep,
  values,
  setFormData,
}) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  //handle symetrie  value
  const [symetrie, setSymetrie] = useState({ getSymetrie: "" });

  const [isAtmNormalChecked, setIsAtmNormalChecked] = useState(false);
  const handleOnIsAtmNormalChange = () => {
    setIsAtmNormalChecked(!isAtmNormalChecked);
    setFormData((prevState) => ({
      ...prevState,
      ["examenAtmNormal"]: !isAtmNormalChecked,
    }));
    console.log("isAtmNormalChecked?", !isAtmNormalChecked);
  };

  const [isAtmDouleurChecked, setIsAtmDouleurChecked] = useState(false);
  const handleOnIsAtmDouleurChange = () => {
    setIsAtmDouleurChecked(!isAtmDouleurChecked);
    setFormData((prevState) => ({
      ...prevState,
      ["examenAtmDouleur"]: !isAtmDouleurChecked,
    }));
    console.log("isAtmDouleurChecked?", !isAtmDouleurChecked);
  };

  const [isAtmClaquementChecked, setIsAtmClaquementChecked] = useState(false);
  const handleOnIsAtmClaquementChange = () => {
    setIsAtmClaquementChecked(!isAtmClaquementChecked);
    setFormData((prevState) => ({
      ...prevState,
      ["examenAtmClaquement"]: !isAtmClaquementChecked,
    }));
    console.log("isAtmClaquementChecked?", !isAtmClaquementChecked);
  };

  const [isAtmAutreChecked, setIsAtmAutreChecked] = useState(false);
  const handleOnIsAtmAutreChange = () => {
    setIsAtmAutreChecked(!isAtmAutreChecked);
    setFormData((prevState) => ({
      ...prevState,
      ["examenAtmAutre"]: !isAtmAutreChecked,
    }));
    console.log("isAtmAutreChecked?", !isAtmAutreChecked);
  };
  // after form submit validating the form data using validator
  const { getSymetrie } = symetrie;
  const handleChangeSymetrie = (e) => {
    e.persist();
    console.log(e?.target?.value);

    setFormData((prevState) => ({
      ...prevState,
      ["symetrie"]: e?.target?.value,
    }));

    setSymetrie((prevState) => ({
      ...prevState,
      getSymetrie: e?.target?.value,
    }));
  };

  //handle symetrie  value
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values?.examenExoBuccal) ||
      validator.isEmpty(values?.dermato) ||
      validator.isEmpty(values?.symetrieExplanation) ||
      getSymetrie.length < 2
    ) {
      setError(true);
    } else {
      nextStep();
      console.log("values?", values);
    }
  };

  return (
    <div>
       <Card>
        <Card.Body>
          <Form onSubmit={submitFormData} className="form my-1">
            <Form.Group className="mb-3">
              <Form.Label>Examen exo-buccal</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="examenExoBuccal"
                defaultValue={values.examenExoBuccal}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("examenExoBuccal")}
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
              <Form.Label>Dermato</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="dermato"
                defaultValue={values.dermato}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("dermato")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Label>Symétrie</Form.Label>
            <Form.Group controlId="getSymetrie" className="mb-3">
              <div id="symetrieContainer">
                <Form.Check
                  value="ouiSymetrie"
                  type="radio"
                  aria-label="ouiSymetrie"
                  label="Oui"
                  onChange={handleChangeSymetrie}
                  checked={getSymetrie === "ouiSymetrie"}
                />
                <Form.Check
                  value="nonSymetrie"
                  type="radio"
                  aria-label="nonSymetrie"
                  label="Non"
                  onChange={handleChangeSymetrie}
                  checked={getSymetrie === "nonSymetrie"}
                />
                {error ? (
                  <Form.Text style={{ color: "red" }}>
                    This is a required field
                  </Form.Text>
                ) : (
                  ""
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Si oui, indiquer l'emplacement</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="symetrieExplanation"
                defaultValue={values.symetrieExplanation}
                type="text"
                placeholder="Write something"
                onChange={handleFormData("symetrieExplanation")}
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
              <Form.Label>Examen des ATM</Form.Label>
              <div id="atmContainer">
                <Form.Check
                  value="examenAtmNormal"
                  type="checkbox"
                  aria-label="examenAtmNormal"
                  label="Normal"
                  name="examenAtmNormal"
                  checked={isAtmNormalChecked}
                  onChange={handleOnIsAtmNormalChange}
                />
                <Form.Check
                  value="Douleur"
                  type="checkbox"
                  aria-label="Douleur"
                  label="Douleur"
                  checked={isAtmDouleurChecked}
                  onChange={handleOnIsAtmDouleurChange}
                />
                <Form.Check
                  value="Claquement"
                  type="checkbox"
                  aria-label="Claquement"
                  label="Claquement"
                  checked={isAtmClaquementChecked}
                  onChange={handleOnIsAtmClaquementChange}
                />
              </div>
              <div id="atmAutre">
                <Form.Check
                  value="Autres"
                  type="checkbox"
                  aria-label="Autres"
                  label="Autres"
                  checked={isAtmAutreChecked}
                  onChange={handleOnIsAtmAutreChange}
                />
                {error ? (
                  <Form.Text style={{ color: "red" }}>
                    This is a required field
                  </Form.Text>
                ) : (
                  ""
                )}
                <Form.Control
                  style={{ border: error ? "2px solid red" : "" }}
                  type="text"
                  placeholder="Write something"
                  onChange={handleFormData("atmAutre")}
                />
                {error ? (
                  <Form.Text style={{ color: "red" }}>
                    This is a required field
                  </Form.Text>
                ) : (
                  ""
                )}
              </div>
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
    </div>
  );
};

export default StepThree;
