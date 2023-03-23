import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {editPost} from "../../actions/post";
const EditPost = ({_id, postInfo, editPost, getPost, match, handleCloseEditPost}) => {
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
    setFormData(postInfo);
  }, [postInfo]);

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
    console.log("Edit Post Form data?", formData)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    editPost(_id, formData);
    getPost(match.params.id);
    getPost(match.params.id);
    handleCloseEditPost();
    // try {
    //   const res = await axios.put(`/api/posts/${props._id}`, formData);
    //   console.log(res.data);
    //   // Add any additional logic for success/failure handling here
    // } catch (err) {
    //   console.error(err);
    //   // Add any additional logic for error handling here
    // }
    // // editPost(props._id, formData);
  };

  return (
    <div className="card-body" id="editPostContainer">
<form className="form my-1">
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={onChange}
          className="form-control"
        ></textarea>
      </div>
      <div className="form-group">
        <label className="form-label">Blood Pressure</label>
        <input
          type="text"
          name="bloodPressure"
          value={bloodPressure}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">dailyMedications</label>
        <input
          type="text"
          name="dailyMedications"
          value={dailyMedications}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">dateOfBirth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">dentalHistory</label>
        <input
          type="text"
          name="dentalHistory"
          value={dentalHistory}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">dermato</label>
        <input
          type="text"
          name="dermato"
          value={dermato}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">detailsDeglutition</label>
        <input
          type="text"
          name="detailsDeglutition"
          value={detailsDeglutition}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">detailsMastication</label>
        <input
          type="text"
          name="detailsMastication"
          value={detailsMastication}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">detailsRespiration</label>
        <input
          type="text"
          name="detailsRespiration"
          value={detailsRespiration}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">examenExoBuccal</label>
        <input
          type="text"
          name="examenExoBuccal"
          value={examenExoBuccal}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">extraoralExamination</label>
        <input
          type="text"
          name="extraoralExamination"
          value={extraoralExamination}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">gender</label>
        <input
          type="text"
          name="gender"
          value={gender}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">intraoralExamination</label>
        <input
          type="text"
          name="intraoralExamination"
          value={intraoralExamination}
          onChange={onChange}
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">medicalHistory</label>
        <input
          type="text"
          name="medicalHistory"
          value={medicalHistory}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">patientReference</label>
        <input
          type="text"
          name="patientReference"
          value={patientReference}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">pulse</label>
        <input
          type="text"
          name="pulse"
          value={pulse}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">reasonConsultation</label>
        <input
          type="text"
          name="reasonConsultation"
          value={reasonConsultation}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">respiration</label>
        <input
          type="text"
          name="respiration"
          value={respiration}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">symetrieExplanation</label>
        <input
          type="text"
          name="symetrieExplanation"
          value={symetrieExplanation}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">symetrie</label>
        <input
          type="text"
          name="symetrie"
          value={symetrie}
          onChange={onChange}
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">examenAtmNormal</label>
        <input
          type="text"
          name="examenAtmNormal"
          value={examenAtmNormal}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">respirationBuccal</label>
        <input
          type="text"
          name="respirationBuccal"
          value={respirationBuccal}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">examenAtmDouleur</label>
        <input
          type="text"
          name="examenAtmDouleur"
          value={examenAtmDouleur}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">examenAtmClaquement</label>
        <input
          type="text"
          name="examenAtmClaquement"
          value={examenAtmClaquement}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">examenAtmAutre</label>
        <input
          type="text"
          name="examenAtmAutre"
          value={examenAtmAutre}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">examenAtmAutreExplanation</label>
        <input
          type="text"
          name="examenAtmAutreExplanation"
          value={examenAtmAutreExplanation}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">respirationNasal</label>
        <input
          type="text"
          name="respirationNasal"
          value={respirationNasal}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">respirationMixte</label>
        <input
          type="text"
          name="respirationMixte"
          value={respirationMixte}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">masticationUnilateral</label>
        <input
          type="text"
          name="masticationUnilateral"
          value={masticationUnilateral}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">masticationBilateral</label>
        <input
          type="text"
          name="masticationBilateral"
          value={masticationBilateral}
          onChange={onChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="form-label">deglutitionTypique</label>
        <input
          type="text"
          name="deglutitionTypique"
          value={deglutitionTypique}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">deglutitionAtypique</label>
        <input
          type="text"
          name="deglutitionAtypique"
          value={deglutitionAtypique}
          onChange={onChange}
          className="form-control"
        />
      </div>
  
    </form>
    <button onClick={onSubmit} className="btn btn-primary">Submit</button>
    </div>
    
  );
};
EditPost.propTypes = {
  editPost: PropTypes.func.isRequired,

};

export default connect(null, { editPost })
(EditPost);




