import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

// creating functional component ans getting props from app.js and destucturing them
const StepFour = ({
  nextStep,
  handleFormData,
  prevStep,
  values,
  addPost,
  setFormData,
  handleClose
}) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  const [item, setItem] = useState({ getGender: "" });

  // after form submit validating the form data using validator
  const [isRespirationNasalChecked, setIsRespirationNasalChecked] =
    useState(false);
  const handleOnIsRespirationNasalChange = () => {
    setIsRespirationNasalChecked(!isRespirationNasalChecked);
    setFormData((prevState) => ({
      ...prevState,
      ["respirationNasal"]: !isRespirationNasalChecked,
    }));
    console.log("isRespirationNasalChecked?", !isRespirationNasalChecked);
  };

  const [isRespirationBuccalChecked, setIsRespirationBuccal] = useState(false);
  const handleOnIsRespirationBuccalChange = () => {
    setIsRespirationBuccal(!isRespirationBuccalChecked);
    setFormData((prevState) => ({
      ...prevState,
      ["respirationBuccal"]: !isRespirationBuccalChecked,
    }));
    console.log("isRespirationBuccalChecked?", !isRespirationBuccalChecked);
  };

  const [isRespirationMixteChecked, setIsRespirationMixteChecked] =
    useState(false);
  const handleOnIsRespirationMixteChange = () => {
    setIsRespirationMixteChecked(!isRespirationMixteChecked);
    setFormData((prevState) => ({
      ...prevState,
      ["respirationMixte"]: !isRespirationMixteChecked,
    }));
    console.log("isRespirationMixteChecked?", !isRespirationMixteChecked);
  };

  const [isMasticationUnilateralChecked, setIsMasticationUnilateralChecked] =
    useState(false);
  const handleOnIsMasticationUnilateralChange = () => {
    setIsMasticationUnilateralChecked(!isMasticationUnilateralChecked);
    setFormData((prevState) => ({
      ...prevState,
      ["masticationUnilateral"]: !isMasticationUnilateralChecked,
    }));
    console.log(
      "isMasticationUnilateralChecked?",
      !isMasticationUnilateralChecked
    );
  };
  const [isMasticationBilateralChecked, setIsMasticationBilateralChecked] =
    useState(false);
  const handleOnIsMasticationBilateralChange = () => {
    setIsMasticationBilateralChecked(!isMasticationBilateralChecked);
    setFormData((prevState) => ({
      ...prevState,
      ["masticationBilateral"]: !isMasticationBilateralChecked,
    }));
    console.log(
      "isMasticationBilateralChecked?",
      !isMasticationBilateralChecked
    );
  };

  const [isDeglutitionTypiqueChecked, setIsDeglutitionTypiqueChecked] =
    useState(false);
  const handleOnIsDeglutitionTypiqueChange = () => {
    setIsDeglutitionTypiqueChecked(!isDeglutitionTypiqueChecked);
    setFormData((prevState) => ({
      ...prevState,
      ["deglutitionTypique"]: !isDeglutitionTypiqueChecked,
    }));
    console.log("isDeglutitionTypiqueChecked?", !isDeglutitionTypiqueChecked);
  };

  const [isDeglutitionAtypiqueChecked, setIsDeglutitionAtypiqueChecked] =
    useState(false);
  const handleOnIsDeglutitionAtypiqueChange = () => {
    setIsDeglutitionAtypiqueChecked(!isDeglutitionAtypiqueChecked);
    setFormData((prevState) => ({
      ...prevState,
      ["deglutitionAtypique"]: !isDeglutitionAtypiqueChecked,
    }));
    console.log("isDeglutitionAtypiqueChecked?", !isDeglutitionAtypiqueChecked);
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
      // addPost(values);
      // handleClose();
    }
  };

  return (
    <div>
  <Card>
    <Card.Body>
      <Form onSubmit={submitFormData} className="form my-1">
        <Form.Label>Examen Fonctionnel </Form.Label>

        <Form.Group controlId="getATM" className="mb-3">
          <Form.Label>La Respiration </Form.Label>
          <div id="respirationChoices">
            <Form.Check
              value="Nasal"
              type="radio"
              aria-label="Nasal"
              label="Nasal"
              checked={isRespirationNasalChecked}
              onChange={handleOnIsRespirationNasalChange}
            />
            <Form.Check
              value="Buccal"
              type="radio"
              aria-label="Buccal"
              label="Buccal"
              checked={isRespirationBuccalChecked}
              onChange={handleOnIsRespirationBuccalChange}
            />
            <Form.Check
              value="Mixte"
              type="radio"
              aria-label="Mixte"
              label="Mixte"
              checked={isRespirationMixteChecked}
              onChange={handleOnIsRespirationMixteChange}
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
              type="radio"
              aria-label="Unilatéral"
              label="Unilatéral"
              checked={isMasticationUnilateralChecked}
              onChange={handleOnIsMasticationUnilateralChange}
            />
            <Form.Check
              value="Bi-latéral"
              type="radio"
              aria-label="Bi-latéral"
              label="Bi-latéral"
              checked={isMasticationBilateralChecked}
              onChange={handleOnIsMasticationBilateralChange}
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
              type="radio"
              aria-label="Typique"
              label="Typique"
              checked={isDeglutitionTypiqueChecked}
              onChange={handleOnIsDeglutitionTypiqueChange}
            />
            <Form.Check
              value="Atypique"
              type="radio"
              aria-label="Atypique"
              label="Atypique"
              checked={isDeglutitionAtypiqueChecked}
              onChange={handleOnIsDeglutitionAtypiqueChange}
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

          <Button variant="primary" onClick={nextStep}>
            Next
          </Button>
        </div>
      </Form>
    </Card.Body>
  </Card>
</div>

    // <div>
    //   <Card>
    //     <Card.Body>
    //       <Form onSubmit={submitFormData} className="form my-1">
    //         <Form.Label>Examen Fonctionnel </Form.Label>

    //         <Form.Group controlId="getATM" className="mb-3">
    //           <Form.Label>La Respiration </Form.Label>
    //           <div id="respirationChoices">
    //             <Form.Check
    //               value="Nasal"
    //               type="checkbox"
    //               aria-label="Nasal"
    //               label="Nasal"
    //               checked={isRespirationNasalChecked}
    //               onChange={handleOnIsRespirationNasalChange}
    //             />
    //             <Form.Check
    //               value="Buccal"
    //               type="checkbox"
    //               aria-label="Buccal"
    //               label="Buccal"
    //               checked={isRespirationBuccalChecked}
    //               onChange={handleOnIsRespirationBuccalChange}
    //             />
    //             <Form.Check
    //               value="Mixte"
    //               type="checkbox"
    //               aria-label="Mixte"
    //               label="Mixte"
    //               checked={isRespirationMixteChecked}
    //               onChange={handleOnIsRespirationMixteChange}
    //             />
    //           </div>

    //           {error ? (
    //             <Form.Text style={{ color: "red" }}>
    //               This is a required field
    //             </Form.Text>
    //           ) : (
    //             ""
    //           )}
    //         </Form.Group>
    //         <Form.Group className="mb-3">
    //           <Form.Label>Détails</Form.Label>
    //           <Form.Control
    //             style={{ border: error ? "2px solid red" : "" }}
    //             name="detailsRespiration"
    //             defaultValue={values.detailsRespiration}
    //             type="text"
    //             placeholder="Write something"
    //             onChange={handleFormData("detailsRespiration")}
    //           />
    //           {error ? (
    //             <Form.Text style={{ color: "red" }}>
    //               This is a required field
    //             </Form.Text>
    //           ) : (
    //             ""
    //           )}
    //         </Form.Group>

    //         <Form.Group controlId="getATM" className="mb-3">
    //           <Form.Label>La Mastication</Form.Label>
    //           <div id="masticationChoices">
    //             <Form.Check
    //               value="Unilatéral"
    //               type="checkbox"
    //               aria-label="Unilatéral"
    //               label="Unilatéral"
    //               checked={isMasticationUnilateralChecked}
    //               onChange={handleOnIsMasticationUnilateralChange}
    //             />
    //             <Form.Check
    //               value="Bi-latéral"
    //               type="checkbox"
    //               aria-label="Bi-latéral"
    //               label="Bi-latéral"
    //               checked={isMasticationBilateralChecked}
    //               onChange={handleOnIsMasticationBilateralChange}
    //             />
    //           </div>

    //           {error ? (
    //             <Form.Text style={{ color: "red" }}>
    //               This is a required field
    //             </Form.Text>
    //           ) : (
    //             ""
    //           )}
    //         </Form.Group>
    //         <Form.Group className="mb-3">
    //           <Form.Label>Détails</Form.Label>
    //           <Form.Control
    //             style={{ border: error ? "2px solid red" : "" }}
    //             name="detailsMastication"
    //             defaultValue={values.detailsMastication}
    //             type="text"
    //             placeholder="Write something"
    //             onChange={handleFormData("detailsMastication")}
    //           />
    //           {error ? (
    //             <Form.Text style={{ color: "red" }}>
    //               This is a required field
    //             </Form.Text>
    //           ) : (
    //             ""
    //           )}
    //         </Form.Group>

    //         <Form.Group controlId="getATM" className="mb-3">
    //           <Form.Label>La Déglutition </Form.Label>
    //           <div id="deglutationChoices">
    //             <Form.Check
    //               value="Typique"
    //               type="checkbox"
    //               aria-label="Typique"
    //               label="Typique"
    //               checked={isDeglutitionTypiqueChecked}
    //               onChange={handleOnIsDeglutitionTypiqueChange}
    //             />
    //             <Form.Check
    //               value="Atypique"
    //               type="checkbox"
    //               aria-label="Atypique"
    //               label="Atypique"
    //               checked={isDeglutitionAtypiqueChecked}
    //               onChange={handleOnIsDeglutitionAtypiqueChange}
    //             />
    //           </div>

    //           {error ? (
    //             <Form.Text style={{ color: "red" }}>
    //               This is a required field
    //             </Form.Text>
    //           ) : (
    //             ""
    //           )}
    //         </Form.Group>
    //         <Form.Group className="mb-3">
    //           <Form.Label>Détails</Form.Label>
    //           <Form.Control
    //             style={{ border: error ? "2px solid red" : "" }}
    //             name="detailsDeglutition"
    //             defaultValue={values.detailsDeglutition}
    //             type="text"
    //             placeholder="Write something"
    //             onChange={handleFormData("detailsDeglutition")}
    //           />
    //           {error ? (
    //             <Form.Text style={{ color: "red" }}>
    //               This is a required field
    //             </Form.Text>
    //           ) : (
    //             ""
    //           )}
    //         </Form.Group>

    //         <div style={{ display: "flex", justifyContent: "space-around" }}>
    //           <Button variant="primary" onClick={prevStep}>
    //             Previous
    //           </Button>

    //           <Button variant="primary" onClick={nextStep}>
    //             Next
    //           </Button>
    //         </div>
    //       </Form>
    //     </Card.Body>
    //   </Card>
    // </div>
  );
};

StepFour.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(StepFour);
