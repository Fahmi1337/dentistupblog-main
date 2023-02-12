import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepFive = ({ nextStep, handleFormData, prevStep, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step
    if (validator.isEmpty(values.medicalHistory) 
    || validator.isEmpty(values.dailyMedications) 
    || validator.isEmpty(values.bloodPressure) 
    || validator.isEmpty(values.pulse) 
    || validator.isEmpty(values.respiration) 
    || validator.isEmpty(values.dentalHistory)
    || validator.isEmpty(values.extraoralExamination)
    || validator.isEmpty(values.intraoralExamination)) {
      setError(true);
    } else {
      nextStep();
    }
  };
  return (
    <>
      <Card style={{ marginTop: 100 }}>
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
           
             

              <Button variant="primary" type="submit">
                Submit
              </Button>
           
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepFive;



// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const onFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const onFormSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("image", selectedFile);
//     try {
//       const response = await axios.post("http://localhost:5000/upload", formData);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={onFormSubmit}>
//       <input type="file" onChange={onFileChange} />
//       <button type="submit">Upload</button>
//     </form>
//   );
// }

// export default App;