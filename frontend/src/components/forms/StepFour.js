import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepFour = ({ nextStep, handleFormData,prevStep ,values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  const [item, setItem] = useState({ getGender: "" });
  
  // after form submit validating the form data using validator
  const { getSymetrie } = item;
  const handleChange = e => {
    e.persist();
    console.log(e?.target?.value);

    setItem(prevState => ({
      ...prevState,
      getGender: e?.target?.value
    }));
  };

  const submitFormData = (e) => {
    e.preventDefault();

    
 
    // checking if value of first name and last name is empty show error else take to step 2
    if (
     
      validator.isEmpty(values?.detailsRespiration) ||
      validator.isEmpty(values?.detailsMastication) ||
      validator.isEmpty(values?.detailsDeglutition) 
     
    ) {
      setError(true);
    } else {
      nextStep();
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
              Continue
            </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StepFour;
