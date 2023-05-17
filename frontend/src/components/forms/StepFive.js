import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";



// creating functional component ans getting props from app.js and destucturing them
const StepFive = ({ nextStep, handleFormData, prevStep, values, addPost, setFormData, handleClose }) => {
  //creating error state for validation
  const [error, setError] = useState(false);






  const handleFileChange = (e) => {
  
    setFormData((prevState) => ({
      ...prevState,
      ["postImage"]: e?.target?.files[0],
    }));
    console.log("image?", e?.target?.files);
    console.log("postImage?", values.postImage);
  };



  // const onFileChange = (event) => {

  //   setFormData((prevState) => ({
  //     ...prevState,
  //     ["images"]: event?.target?.files,
  //   }));
  // };



  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();



    // const formDataToSend = new FormData();

    // for (const key in values) {
    //   if (values.hasOwnProperty(key)) {
    //     formDataToSend.append(key, values[key]);
    //   }
    // }





    const data = new FormData();
    data.append("postImage", values.postImage);
    Object.keys(values).forEach((key) => {
      if (key !== "postImage") {
        data.append(key, values[key]);
      }
    });


    // data.append("profileCover", formData.profileCover);
    // Object.keys(formData).forEach((key) => {
    //   if (key !== "profileCover") {
    //     data.append(key, formData[key]);
    //   }
    // });


console.log("final data?", data)



    addPost(data);
      // handleClose();
 
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Form onSubmit={submitFormData} className="form my-1">
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="file"
                name="image" 
                multiple
                onChange={handleFileChange}
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