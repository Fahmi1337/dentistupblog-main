import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { addPost } from "../../actions/post";

import { Container, Row, Col } from "react-bootstrap";
import StepOne from "../forms/StepOne";
import StepTwo from "../forms/StepTwo";
import StepThree from "../forms/StepThree";
import StepFour from "../forms/StepFour";
import StepFive from "../forms/StepFive";
import Final from "../forms/Final";

const PostForm = ({_id, postInfo, editPost, getPost, match, handleCloseEditPost, editMode}) => {


  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
    patientReference: "",
    dateOfBirth: "",
    reasonConsultation: "",
    gender: "",
    medicalHistory: "",
    dailyMedications: "",
    bloodPressure: "",
    pulse: "",
    respiration: "",
    dentalHistory: "",
    extraoralExamination: "",
    intraoralExamination: "",
    examenExoBuccal: "",
    dermato: "",
    symetrie: "",
    symetrieExplanation: "",
    examenAtmNormal: "",
    examenAtmDouleur: "",
    examenAtmClaquement: "",
    examenAtmAutre: "",
    examenAtmAutreExplanation: "",
    respirationNasal: "",
    respirationBuccal: "",
    respirationMixte: "",
    detailsRespiration: "",
    masticationUnilateral: "",
    masticationBilateral: "",
    detailsMastication: "",
    deglutitionTypique: "",
    deglutitionAtypique: "",
    detailsDeglutition: "",
    title: "",
    description: "",
  });
  useEffect(() => {
    if(postInfo){
      setFormData(postInfo);
      console.log("edit form?", formData)
    }
 
  }, [postInfo]);
  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = (input) => (e) => {
    // input value from the form
    const { value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  // javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <StepOne
                  nextStep={nextStep}
                  handleFormData={handleInputData}
                  values={formData}
                  setFormData={setFormData}
                  editMode={editMode}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <StepTwo
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                  editMode={editMode}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 3:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <StepThree
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                  setFormData={setFormData}
                  editMode={editMode}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 4:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <StepFour
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                  setFormData={setFormData}
                  editMode={editMode}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    case 5:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <StepFive
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                  editMode={editMode}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // Only formData is passed as prop to show the final value at form submit
    case 6:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} className="custom-margin">
                <Final values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // default case to show nothing
    default:
      return <div className="App"></div>;
  }
};

// PostForm.propTypes = {
//   addPost: PropTypes.func.isRequired,
// };

// export default connect(null, { addPost })(PostForm);
export default PostForm;
