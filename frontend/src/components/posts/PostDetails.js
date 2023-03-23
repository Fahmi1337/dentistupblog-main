import React, { Fragment } from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import EditPost from "./EditPost";
import PostForm from "./PostForm";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Spinner from "../layout/Spinner";
const PostDetails = ({postInfo, auth, user, deletePost, _id, getPost, match}) => {

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80em",
    bgcolor: "background.paper",
   borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };
  const [openEditPost, setOpenEditPost] = React.useState(false);
  const handleOpenEditPost = () => setOpenEditPost(true);
  const handleCloseEditPost = () => setOpenEditPost(false);

  const BloodPressureLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      // backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
      backgroundColor: postInfo.bloodPressure < 120 ? '#a6ce39' : '#bb3a01',
    },
  }));

  const PulseLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      // backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
      backgroundColor: postInfo.pulse < 74 ? '#a6ce39' : '#bb3a01',
    },
  }));


  const RespirationLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      // backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
      backgroundColor: postInfo.respiration < 45 ? '#a6ce39' : '#bb3a01',
    },
  }));

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

return !postInfo  ? (
  <Spinner />
) : (
    <Fragment>
      <div>
        {!auth.loading && user === auth.user._id && (
          <div>
            <Modal
              open={openEditPost}
              onClose={handleCloseEditPost}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <EditPost _id={_id} postInfo={postInfo}  getPost={getPost} match={match} handleCloseEditPost={handleCloseEditPost}/>
                {/* <PostForm _id={_id} postInfo={postInfo}  getPost={getPost} match={match} handleCloseEditPost={handleCloseEditPost} editMode={true}/> */}
              </Box>
            </Modal>
            <button
              onClick={() => {
                handleOpenEditPost();
              }}
              type="button"
              className="btn btn-success"
            >
              <i className="fas fa-pen"> Edit Post</i>
            </button>

            <button
              onClick={(e) => deletePost(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times"> Delete Post</i>
            </button>
          </div>
        )}
        {/* <p className="my-1"> Title : {postInfo.title} </p> */}
        <div id="postDetailsContainer">
        <p className="my-1"> Description : {postInfo.description} </p>
        <div className="threeColumns">
          <div className="gridOne">
            <p className="my-1">
              Référence - {postInfo.patientReference}{" "}
            </p>
            <p className="my-1"> Gender - {postInfo.gender}</p>
            <p className="my-1">Date of birth - {postInfo.dateOfBirth} </p>
            <p className="my-1">Age - {getAge(postInfo.dateOfBirth)}</p>
            <p className="my-1">Medical History - {postInfo.medicalHistory} </p>
            <p className="my-1">
              Daily Medication - {postInfo.dailyMedications}{" "}
            </p>
           
<p className="my-1">
  Reason of consultation - {postInfo.reasonConsultation}{" "}
</p>
<p className="my-1"> Blood Pressure - {postInfo.bloodPressure} </p>
          <div style={{width: "50%"}}> <BloodPressureLinearProgress variant="determinate" value={postInfo.bloodPressure*100/180} /></div>
          <p className="my-1">Pulse - {postInfo.pulse} </p>
          <div style={{width: "50%"}}> <PulseLinearProgress variant="determinate" value={(postInfo.pulse*100/82)-30} /></div>
          <p className="my-1">Respiration - {postInfo.respiration} </p>
          <div style={{width: "50%"}}> <RespirationLinearProgress variant="determinate" value={(postInfo.respiration*100/45)} /></div>
          </div>
          <div className="gridTwo">
         
          
            <p className="my-1">
              Extraoral Examination - {postInfo.extraoralExamination}{" "}
            </p>
            <p className="my-1">
              Intraoral Examination - {postInfo.intraoralExamination}{" "}
            </p>
            <p className="my-1">Examen exo-buccal - {postInfo.examenExoBuccal} </p>
            <p className="my-1">Dermato - {postInfo.dermato} </p>
            <p className="my-1">Symétrie - {postInfo.symetrie} </p>
            <p className="my-1">
              Détails Symétrie : {postInfo.symetrieExplanation}{" "}
            </p>
           <h3>Examen des ATM</h3>
            <p className="my-1">
              Normal - {postInfo.examenAtmNormal}{" "}
            </p>
            <p className="my-1">
              Douleur - {postInfo.examenAtmDouleur}{" "}
            </p>
            <p className="my-1">
              Claquement - {postInfo.examenAtmClaquement}{" "}
            </p>
           
            <p className="my-1">Autres - {postInfo.examenAtmAutre} </p>
            <p className="my-1">
              Explication - {postInfo.examenAtmAutreExplanation}{" "}
            </p>
           
         
           
          
          </div>
          <div className="gridThree">
          <h3>Examens Fonctionnels</h3>
          <h4>Respiration</h4>
          <p className="my-1">
              respirationNasal: {postInfo.respirationNasal}{" "}
            </p>
            <p className="my-1">
              respirationMixte: {postInfo.respirationMixte}{" "}
            </p>
          <p className="my-1">
              {" "}
              respirationBuccal: {postInfo.respirationBuccal}
            </p>
            <p className="my-1">
              detailsRespiration : {postInfo.detailsRespiration}{" "}
            </p>
            <h4>Mastication</h4>
            <p className="my-1">
              detailsMastication : {postInfo.detailsMastication}{" "}
            </p>
           
            <p className="my-1">
              masticationBilateral : {postInfo.masticationBilateral}{" "}
            </p>
            <p className="my-1">
              masticationUnilateral: {postInfo.masticationUnilateral}{" "}
            </p>
            <h4>Déglutition</h4>
            <p className="my-1">
              deglutitionTypique : {postInfo.deglutitionTypique}{" "}
            </p>
          <p className="my-1">
              deglutitionAtypique : {postInfo.deglutitionAtypique}{" "}
            </p>
            <p className="my-1">
              detailsDeglutition : {postInfo.detailsDeglutition}{" "}
            </p>

            <p className="my-1"> dentalHistory : {postInfo.dentalHistory}</p>
          
         
          
          
       
        
          </div>
        </div>
        </div>
      
      </div>
    </Fragment>
  );
};
export default PostDetails;
