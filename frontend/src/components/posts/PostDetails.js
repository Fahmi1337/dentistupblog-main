import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
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

            {/* <button
              onClick={(e) => deletePost(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times"> Delete Post</i>
            </button> */}
          </div>
        )}
        {/* <p className="my-1"> Title : {postInfo.title} </p> */}
        <div id="postDetailsContainer">
        <p className="my-1" id="postDescription"> {postInfo.description} </p>
        <div className="threeColumns">
          <div className="gridOne">
            <p className="my-1">
              <span>Référence  </span>
               {postInfo.patientReference}{" "}
            </p>
            <p className="my-1"><span>Gender -</span>  {postInfo.gender}</p>
            <p className="my-1"><span>Date of birth -</span> {postInfo.dateOfBirth} </p>
            <p className="my-1"><span>Age </span> {getAge(postInfo.dateOfBirth)}</p>
            <p className="my-1"><span>Medical History -</span> {postInfo.medicalHistory} </p>
            <p className="my-1">
            <span>Daily Medication -</span> {postInfo.dailyMedications}{" "}
            </p>
           
<p className="my-1">
<span>Reason of consultation -</span> {postInfo.reasonConsultation}{" "}
</p>
<p className="my-1"> <span>Blood Pressure </span> {postInfo.bloodPressure} mm Hg</p>
          <div style={{width: "50%"}}> <BloodPressureLinearProgress variant="determinate" value={postInfo.bloodPressure*100/180} /></div>
          <p className="my-1"><span>Pulse </span> {postInfo.pulse} Pulse/min</p>
          <div style={{width: "50%"}}> <PulseLinearProgress variant="determinate" value={(postInfo.pulse*100/82)-30} /></div>
          <p className="my-1"><span>Respiration </span> {postInfo.respiration} per minute</p>
          <div style={{width: "50%"}}> <RespirationLinearProgress variant="determinate" value={(postInfo.respiration*100/45)} /></div>
          </div>
          <div className="gridTwo">
         
          
            <p className="my-1">
            <span>Extraoral Examination -</span> {postInfo.extraoralExamination}{" "}
            </p>
            <p className="my-1">
            <span>Intraoral Examination -</span> {postInfo.intraoralExamination}{" "}
            </p>
            <p className="my-1"><span>Examen exo-buccal -</span> {postInfo.examenExoBuccal} </p>
            <p className="my-1"><span>Dermato -</span> {postInfo.dermato} </p>
            <p className="my-1"><span>Symétrie -</span> {postInfo.symetrie === "ouiSymetrie" ? <CheckCircleIcon/> : <UnpublishedIcon/> } </p>
            <p className="my-1">
            <span>Détails Symétrie -</span> {postInfo.symetrieExplanation}{" "}
            </p>
           <h3><span></span>Examen des ATM</h3>
            <p className="my-1">
            <span>Normal -</span> {postInfo.examenAtmNormal === "true" ? <CheckCircleIcon/> : <UnpublishedIcon/>}
            </p>
            <p className="my-1">
            <span>Douleur -</span> {postInfo.examenAtmDouleur === "true" ? <CheckCircleIcon/> : <UnpublishedIcon/>}
            </p>
            <p className="my-1">
            <span>Claquement -</span> {postInfo.examenAtmClaquement === "true" ? <CheckCircleIcon/> : <UnpublishedIcon/>}
            </p>
           
            <p className="my-1"><span>Autres -</span> {postInfo.examenAtmAutre === "true" ? <CheckCircleIcon/> : <UnpublishedIcon/>}</p>
            <p className="my-1">
            <span>Explication -</span> {postInfo.examenAtmAutreExplanation}{" "}
            </p>
           
         
           
          
          </div>
          <div className="gridThree">
          <h3>Examens Fonctionnels</h3>
          <h4>Respiration</h4>
          <p className="my-1">
          <span>Nasal -</span> {postInfo.respirationNasal === "true" ? <CheckCircleIcon/> : <UnpublishedIcon/>}{" "}
            </p>
            <p className="my-1">
            <span>Mixte -</span> {postInfo.respirationMixte === "true" ? <CheckCircleIcon/> : <UnpublishedIcon/>}{" "}
            </p>
          <p className="my-1">
              {" "}
              <span>Buccal -</span> {postInfo.respirationBuccal === "true" ? <CheckCircleIcon/> : <UnpublishedIcon/>}
            </p>
            <p className="my-1">
            <span>Détails -</span> {postInfo.detailsRespiration}{" "}
            </p>
           
           
            <h4>Mastication</h4>
            <p className="my-1">
            <span>Bilateral -</span> {postInfo.masticationBilateral === "true" ? <CheckCircleIcon/> : <UnpublishedIcon/>}{" "}
            </p>
            <p className="my-1">
            <span>Unilateral -</span> {postInfo.masticationUnilateral === "true" ? <CheckCircleIcon/> : <UnpublishedIcon/>}{" "}
            </p>
            <p className="my-1">
            <span>Détails -</span> {postInfo.detailsMastication}{" "}
            </p>
            <h4>Déglutition</h4>
            <p className="my-1">
            <span>Typique -</span> {postInfo.deglutitionTypique === "true" ? <CheckCircleIcon/> : <UnpublishedIcon/>}{" "}
            </p>
          <p className="my-1">
          <span>Atypique -</span> {postInfo.deglutitionAtypique === "true" ? <CheckCircleIcon/> : <UnpublishedIcon/>}{" "}
            </p>
            <p className="my-1">
            <span>Détails -</span> {postInfo.detailsDeglutition}{" "}
            </p>

            <p className="my-1"> <span>Dental History -</span> {postInfo.dentalHistory}</p>
          
         
          
          
       
        
          </div>
        </div>
        </div>
      
      </div>
    </Fragment>
  );
};
export default PostDetails;
