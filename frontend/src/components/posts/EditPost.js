import React, { useState, useEffect } from "react";
import axios from "axios";
import { editPost } from "../../actions/post";
const EditPost = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bloodPressure: "",
    dailyMedications: "",
    dateOfBirth: "",
    dentalHistory: "",
    dermato: "",
    detailsDeglutition: "",
    detailsMastication: "",
    detailsRespiration: "",
    examenExoBuccal: "",
    extraoralExamination: "",
    gender: "",
    intraoralExamination: "",
    medicalHistory: "",
    patientReference: "",
    pulse: "",
    reasonConsultation: "",
    respiration: "",
    symetrieExplanation: "",
    symetrie: "",
    examenAtmNormal: "",
    examenAtmDouleur: "",
    examenAtmClaquement: "",
    examenAtmAutre: "",
    examenAtmAutreExplanation: "",
    respirationNasal: "",
    respirationBuccal: "",
    respirationMixte: "",
    masticationUnilateral: "",
    masticationBilateral: "",
    deglutitionTypique: "",
    deglutitionAtypique: "",
  });
  console.log("FORM DATA?", formData);
  useEffect(() => {
    setFormData(props.postInfo);
  }, [props.postInfo]);

  const {
    title,
    description,
    bloodPressure,
    dailyMedications,
    dateOfBirth,
    dentalHistory,
    dermato,
    detailsDeglutition,
    detailsMastication,
    detailsRespiration,
    examenExoBuccal,
    extraoralExamination,
    gender,
    intraoralExamination,
    medicalHistory,
    patientReference,
    pulse,
    reasonConsultation,
    respiration,
    symetrieExplanation,
    symetrie,
    examenAtmNormal,
    examenAtmDouleur,
    examenAtmClaquement,
    examenAtmAutre,
    examenAtmAutreExplanation,
    respirationNasal,
    respirationBuccal,
    respirationMixte,
    masticationUnilateral,
    masticationBilateral,
    deglutitionTypique,
    deglutitionAtypique,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/posts/${props._id}`, formData);
      console.log(res.data);
      // Add any additional logic for success/failure handling here
    } catch (err) {
      console.error(err);
      // Add any additional logic for error handling here
    }
    // editPost(props._id, formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={description}
          onChange={onChange}
          className="form-control"
        ></textarea>
      </div>
      <div className="form-group">
        <label>Blood Pressure</label>
      </div>
      <button>Submit</button>
    </form>
  );
};
export default EditPost;
