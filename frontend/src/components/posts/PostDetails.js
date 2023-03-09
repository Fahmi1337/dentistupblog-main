import React, { Fragment } from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import EditPost from "./EditPost";
const PostDetails = (props) => {
  const postInfo = props.postInfo;
  const auth = props.auth;
  const user = props.user;
  const deletePost = props.deletePost;
  const _id = props._id;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Fragment>
      <div>
        {!auth.loading && user === auth.user._id && (
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <EditPost _id={_id} postInfo={postInfo} />
              </Box>
            </Modal>
            <button
              onClick={(e) => {
                handleOpen();
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
        <p className="my-1"> Description : {postInfo.description} </p>
        <div className="threeColumns">
          <div className="gridOne">
            <p className="my-1">
              patientReference: {postInfo.patientReference}{" "}
            </p>
            <p className="my-1"> gender : {postInfo.gender}</p>
            <p className="my-1">dateOfBirth : {postInfo.dateOfBirth} </p>
          </div>
          <div className="gridTwo">
            <p className="my-1"> bloodPressure : {postInfo.bloodPressure} </p>
            <p className="my-1">
              dailyMedications : {postInfo.dailyMedications}{" "}
            </p>

            <p className="my-1">
              deglutitionAtypique : {postInfo.deglutitionAtypique}{" "}
            </p>
            <p className="my-1">
              deglutitionTypique : {postInfo.deglutitionTypique}{" "}
            </p>
            <p className="my-1"> dentalHistory : {postInfo.dentalHistory}</p>
            <p className="my-1">dermato : {postInfo.dermato} </p>
            <p className="my-1">
              detailsDeglutition : {postInfo.detailsDeglutition}{" "}
            </p>
            <p className="my-1">
              detailsMastication : {postInfo.detailsMastication}{" "}
            </p>
            <p className="my-1">
              detailsRespiration : {postInfo.detailsRespiration}{" "}
            </p>
            <p className="my-1">examenAtmAutre : {postInfo.examenAtmAutre} </p>
            <p className="my-1">
              examenAtmAutreExplanation :{postInfo.examenAtmAutreExplanation}{" "}
            </p>
            <p className="my-1">
              examenAtmClaquement : {postInfo.examenAtmClaquement}{" "}
            </p>
            <p className="my-1">
              examenAtmDouleur :{postInfo.examenAtmDouleur}{" "}
            </p>
            <p className="my-1">
              examenAtmNormal : {postInfo.examenAtmNormal}{" "}
            </p>
            <p className="my-1">examenExoBuccal: {postInfo.examenExoBuccal} </p>
            <p className="my-1">
              extraoralExamination : {postInfo.extraoralExamination}{" "}
            </p>
          </div>
          <div className="gridThree">
            <p className="my-1">
              intraoralExamination : {postInfo.intraoralExamination}{" "}
            </p>
            <p className="my-1">
              masticationBilateral : {postInfo.masticationBilateral}{" "}
            </p>
            <p className="my-1">
              masticationUnilateral: {postInfo.masticationUnilateral}{" "}
            </p>
            <p className="my-1">medicalHistory: {postInfo.medicalHistory} </p>

            <p className="my-1">pulse: {postInfo.pulse} </p>
            <p className="my-1">
              reasonConsultation: {postInfo.reasonConsultation}{" "}
            </p>
            <p className="my-1">respiration: {postInfo.respiration} </p>
            <p className="my-1">
              {" "}
              respirationBuccal: {postInfo.respirationBuccal}
            </p>
            <p className="my-1">
              respirationMixte: {postInfo.respirationMixte}{" "}
            </p>
            <p className="my-1">
              respirationNasal: {postInfo.respirationNasal}{" "}
            </p>
            <p className="my-1">symetrie: {postInfo.symetrie} </p>
            <p className="my-1">
              symetrieExplanation : {postInfo.symetrieExplanation}{" "}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default PostDetails;
