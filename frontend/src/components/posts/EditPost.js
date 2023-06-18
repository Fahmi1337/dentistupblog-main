import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {editPost} from "../../actions/post";
import { getPost } from "../../actions/post";
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
    concernedTeeth: "",
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




  // const handleFileChange = (e) => {
  
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     ["postImage"]: e?.target?.files[0],
  //   }));
  //   console.log("image?", e?.target?.files);
  //   console.log("postImage?", formData.postImage);
  // };

  const {
    
    title,
    description,
    bloodPressure,
    dailyMedications,
    dateOfBirth,
    dentalHistory,
    concernedTeeth,
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


  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    const value = event.target.checked; // get the new checkbox value
  
    // update the state with the new checkbox value
    setFormData({ ...formData, [name]: value });
  };


  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("Edit Post Form data?", formData)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    editPost(_id, formData);
    getPost(_id);
    getPost(_id);
  
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
        <label className="form-label">Patient Reference</label>
        <input
          type="text"
          name="patientReference"
          value={patientReference}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Date of birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={onChange}
          className="form-control"
        />
      </div>
      {/* <div className="form-group">
        <label className="form-label">gender</label>
        <input
          type="text"
          name="gender"
          value={gender}
          onChange={onChange}
          className="form-control"
        />
      </div> */}
       <div className="form-group">
      <label className="form-label">Gender</label>
      <div className="form-check">
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          checked={gender === 'male'}
          onChange={onChange}
          className="form-check-input"
        />
        <label htmlFor="male" className="form-check-label">
          Male
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          checked={gender === 'female'}
          onChange={onChange}
          className="form-check-input"
        />
        <label htmlFor="female" className="form-check-label">
          Female
        </label>
      </div>
    </div>
    <div className="form-group">
        <label className="form-label">Reason for consultation</label>
        <input
          type="text"
          name="reasonConsultation"
          value={reasonConsultation}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Medical History</label>
        <input
          type="text"
          name="medicalHistory"
          value={medicalHistory}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Daily medications</label>
        <input
          type="text"
          name="dailyMedications"
          value={dailyMedications}
          onChange={onChange}
          className="form-control"
        />
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
        <label className="form-label">Pulse</label>
        <input
          type="text"
          name="pulse"
          value={pulse}
          onChange={onChange}
          className="form-control"
        />
      </div>
    
      <div className="form-group">
        <label className="form-label">Respiration</label>
        <input
          type="text"
          name="respiration"
          value={respiration}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Concerned Teeth</label>
        <input
          type="text"
          name="concernedTeeth"
          value={concernedTeeth}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Dental History</label>
        <input
          type="text"
          name="dentalHistory"
          value={dentalHistory}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Extraoral Examination</label>
        <input
          type="text"
          name="extraoralExamination"
          value={extraoralExamination}
          onChange={onChange}
          className="form-control"
        />
      </div>
  
      <div className="form-group">
        <label className="form-label">Intraoral Examination</label>
        <input
          type="text"
          name="intraoralExamination"
          value={intraoralExamination}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Examen exo-buccal</label>
        <input
          type="text"
          name="examenExoBuccal"
          value={examenExoBuccal}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Dermato</label>
        <input
          type="text"
          name="dermato"
          value={dermato}
          onChange={onChange}
          className="form-control"
        />
      </div>
      {/* <div className="form-group">
        <label className="form-label">symetrie</label>
        <input
          type="text"
          name="symetrie"
          value={symetrie}
          onChange={onChange}
          className="form-control"
        />
      </div> */}
       <div className="form-group">
      <label className="form-label">Symetrie</label>
      <div className="form-check">
        <input
          type="radio"
          id="ouiSymetrie"
          name="symetrie"
          value="ouiSymetrie"
          checked={symetrie === 'ouiSymetrie'}
          onChange={onChange}
          className="form-check-input"
        />
        <label htmlFor="ouiSymetrie" className="form-check-label">
          Oui
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          id="nonSymetrie"
          name="symetrie"
          value="nonSymetrie"
          checked={symetrie === 'nonSymetrie'}
          onChange={onChange}
          className="form-check-input"
        />
        <label htmlFor="nonSymetrie" className="form-check-label">
          Non
        </label>
      </div>
    </div>

    <div className="form-group">
        <label className="form-label">Si oui, indiquer l'emplacement</label>
        <input
          type="text"
          name="symetrieExplanation"
          value={symetrieExplanation}
          onChange={onChange}
          className="form-control"
        />
      </div>



      <label className="form-label">Examen des ATM</label>
      <div className="form-group">
    
        
        <input
      type="checkbox"
      id="examenAtmNormal"
      name="examenAtmNormal"
      checked={examenAtmNormal ==="true" ? true : undefined}
          onChange={handleCheckboxChange}
          className="form-control"
        />
        Normal
      </div>

      <div className="form-group">
        
        <input
          type="checkbox"
          id="examenAtmDouleur"
          name="examenAtmDouleur"
          checked={examenAtmDouleur ==="true" ? true : undefined}
          onChange={handleCheckboxChange}
          className="form-control"
        />
        Douleur
      </div>
      <div className="form-group">
    
        <input
         type="checkbox"
         id="examenAtmClaquement"
         name="examenAtmClaquement"
         checked={examenAtmClaquement ==="true" ? true : undefined}
          onChange={handleCheckboxChange}
          className="form-control"
        />
        Claquement
      </div>
      <div className="form-group">
        
        <input
          type="checkbox"
          id="examenAtmAutre"
          name="examenAtmAutre"
          checked={examenAtmAutre ==="true" ? true : undefined}
          onChange={handleCheckboxChange}
          className="form-control"
        />
        Autre
      </div>
      <div className="form-group">
      <label className="form-label">Détails</label>
        <input
          type="text"
          name="examenAtmAutreExplanation"
          value={examenAtmAutreExplanation}
          onChange={onChange}
          className="form-control"
        />
      </div>




    
   
      <label className="form-label">Examen Fonctionnel</label>
     <div>
     <label className="form-label">La Respiration</label>
      </div> 
      <div className="form-group">
       
        <input
          type="checkbox"
          name="respirationNasal"
          checked={respirationNasal ==="true" ? true : undefined}
          onChange={handleCheckboxChange}
          className="form-control"
        />
        Nasal
      </div>
      <div className="form-group">
       
        <input
          type="checkbox"
          name="respirationBuccal"
          checked={respirationBuccal ==="true" ? true : undefined}
          onChange={handleCheckboxChange}
          className="form-control"
        />
        Buccal
      </div>
      <div className="form-group">
       
        <input
          type="checkbox"
          name="respirationMixte"
          checked={respirationMixte ==="true" ? true : undefined}
          onChange={handleCheckboxChange}
          className="form-control"
        />
        Mixte
      </div>
      <div className="form-group">
        <label className="form-label">Détails</label>
        <input
          type="text"
          name="detailsRespiration"
          value={detailsRespiration}
          onChange={onChange}
          className="form-control"
        />
      </div>


      <label className="form-label">La Mastication</label>
      <div className="form-group">
        
        <input
          type="checkbox"
          name="masticationUnilateral"
          checked={masticationUnilateral ==="true" ? true : undefined}
          onChange={handleCheckboxChange}
          className="form-control"
        />
        Unilatéral
      </div>
      <div className="form-group">
       
        <input
          type="checkbox"
          name="masticationBilateral"
          checked={masticationBilateral ==="true" ? true : undefined}
          onChange={handleCheckboxChange}
          className="form-control"
        />
        Bi-latéral
      </div>
  
      <div className="form-group">
        <label className="form-label">Détails</label>
        <input
          type="text"
          name="detailsMastication"
          value={detailsMastication}
          onChange={onChange}
          className="form-control"
        />
      </div>
     
     
   
      
     
      <label className="form-label">La Déglutition</label>
      <div className="form-group">
   
        <input
          type="checkbox"
          name="deglutitionTypique"
          checked={deglutitionTypique ==="true" ? true : undefined}
          onChange={handleCheckboxChange}
          className="form-control"
        />Typique
      </div>
      <div className="form-group">
      
        <input
          type="checkbox"
          name="deglutitionAtypique"
          checked={deglutitionAtypique ==="true" ? true : undefined}
          onChange={handleCheckboxChange}
          className="form-control"
        />
        Atypique
      </div>
     
      <div className="form-group">
        <label className="form-label">Détails</label>
        <input
          type="text"
          name="detailsDeglutition"
          value={detailsDeglutition}
          onChange={onChange}
          className="form-control"
        />
      </div>
      
      
  {/* <div className="form-group">
  <label className="form-label">Post Image</label>
  <input
    type="file"
    name="postImage"
    onChange={handleFileChange}
    className="form-control"
  />
</div> */}
     

     
  
    </form>
    <button onClick={onSubmit} className="btn btn-primary">Submit</button>
    </div>
    
  );
};
EditPost.propTypes = {
  editPost: PropTypes.func.isRequired,

};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost, editPost } )
(EditPost);




