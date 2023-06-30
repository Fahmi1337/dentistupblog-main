import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import Modal from "@mui/material/Modal";
import EditPost from "./EditPost";
import PostForm from "./PostForm";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Spinner from "../layout/Spinner";
import { ImageGroup, Image } from "react-fullscreen-image";
import teethNumbers from "../../img/deethNumbers.svg";

import { Icon } from "@iconify/react";
// creating functional component ans getting props from app.js and destucturing them

const PostDetails = ({
  postInfo,
  auth,
  user,
  deletePost,
  _id,
  getPost,
  match,
}) => {
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

  const TeethStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40em",
    bgcolor: "background.paper",
    textAlign: "center",
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
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      // backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
      backgroundColor: postInfo.bloodPressure < 120 ? "#a6ce39" : "#bb3a01",
    },
  }));

  const PulseLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      // backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
      backgroundColor: postInfo.pulse < 74 ? "#a6ce39" : "#bb3a01",
    },
  }));

  const RespirationLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      // backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
      backgroundColor: postInfo.respiration < 45 ? "#a6ce39" : "#bb3a01",
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
  const images = [
    `${process.env.REACT_APP_BASE_URL + "/" + postInfo.postImage}`,
    // "https://www.barkerdentalcare.co.uk/wp-content/uploads/2016/12/CI2-decay.jpg",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS53-plCXj8yvWBSCyebWWuaiHQvPiMo3KfZcpsycLM4ISZpn5Mgd74hBJy85AtPI69VzQ&usqp=CAU",
  ];

  // for (var i = 0; i < postInfo.postImages.length; i++) {
  //   images.push(postImages[i]?.post);
  // }

  //Modal options
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return !postInfo ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>
        <div id="postDetailsContainer">
          <p className="my-1">
            <span>Reason of consultation -</span> {postInfo.reasonConsultation}{" "}
          </p>

          <p className="my-1" id="postDescription">
            {" "}
            {postInfo.description}{" "}
          </p>
          <div className="threeColumns">
            <div className="gridOne">
              <p className="my-1">
                <span>Référence </span>
                {postInfo.patientReference}{" "}
              </p>
              <p className="my-1">
                <div className="postIconsInfo">
                  <span>Gender - </span>

                  {postInfo.gender === "male" && (
                    <i
                      class="fa-solid fa-mars"
                      style={{ color: "#4e9ec64d" }}
                    ></i>
                  )}
                  {postInfo.gender === "female" && (
                    <i class="fa-solid fa-venus" style={{ color: "pink" }}></i>
                  )}
                </div>
              </p>
              <p className="my-1">
                <span>Date of birth -</span> {postInfo.dateOfBirth}{" "}
              </p>
              <p className="my-1">
                <span>Age </span> {getAge(postInfo.dateOfBirth)}
              </p>
            </div>
            <div className="gridTwo">
              <div className="postDetailsDescTwo">
                <div className="postDetailsDescTwoLeft">
                  <p className="my-1">
                    <span>Medical History -</span> {postInfo.medicalHistory}{" "}
                  </p>
                  <p className="my-1">
                    {" "}
                    <span>Dental History -</span> {postInfo.dentalHistory}
                  </p>
                  <p className="my-1">
                    <span>Daily Medication -</span> {postInfo.dailyMedications}{" "}
                  </p>

                  <p className="my-1">
                    <span>
                      Concerned teeth{" "}
                      <Icon
                        icon="fluent:info-24-regular"
                        onClick={handleOpen}
                        className="concernedTeethIconInfo"
                      />{" "}
                      -{" "}
                    </span>{" "}
                    {postInfo?.concernedTeeth?.trim()}{" "}
                  </p>
                </div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={TeethStyle}>
                    <img
                      src={teethNumbers}
                      alt="teeth"
                      style={{ width: "30em", textAlign: "center" }}
                    />
                  </Box>
                </Modal>
                <div className="postDetailsDescTwoRight">
                  <p className="my-1">
                    {" "}
                    <span>Blood Pressure </span>{" "}
                    <i
                      class="fa-solid fa-heart-pulse"
                      style={{ color: "#4e9ec64d" }}
                    ></i>{" "}
                    {postInfo.bloodPressure} mm Hg
                  </p>
                  <div style={{ width: "50%" }}>
                    {" "}
                    <BloodPressureLinearProgress
                      variant="determinate"
                      value={(postInfo.bloodPressure * 100) / 180}
                    />
                  </div>
                  <p className="my-1">
                    <span>Pulse </span>{" "}
                    <i
                      class="fa-solid fa-droplet"
                      style={{ color: "#4e9ec64d" }}
                    ></i>{" "}
                    {postInfo.pulse} /min
                  </p>
                  <div style={{ width: "50%" }}>
                    {" "}
                    <PulseLinearProgress
                      variant="determinate"
                      value={(postInfo.pulse * 100) / 82 - 30}
                    />
                  </div>
                  <p className="my-1">
                    <span>Respiration </span>{" "}
                    <i
                      class="fa-solid fa-lungs"
                      style={{ color: "#4e9ec64d" }}
                    ></i>{" "}
                    {postInfo.respiration} /min
                  </p>
                  <div style={{ width: "50%" }}>
                    {" "}
                    <RespirationLinearProgress
                      variant="determinate"
                      value={(postInfo.respiration * 100) / 45}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="gridThree">
              <div className="postDetailsExamsOne">
                <h3>Examens Généraux</h3>
                <p className="my-1">
                  <span>Extraoral Examination -</span>{" "}
                  {postInfo.extraoralExamination}{" "}
                </p>
                <p className="my-1">
                  <span>Intraoral Examination -</span>{" "}
                  {postInfo.intraoralExamination}{" "}
                </p>
                <p className="my-1">
                  <span>Examen exo-buccal -</span> {postInfo.examenExoBuccal}{" "}
                </p>
                <p className="my-1">
                  <span>Dermato -</span> {postInfo.dermato}{" "}
                </p>
                <p className="my-1">
                  <span>Symétrie -</span>{" "}
                  {postInfo.symetrie === "ouiSymetrie" ? (
                    <CheckCircleIcon />
                  ) : (
                    <UnpublishedIcon />
                  )}{" "}
                </p>
                <p className="my-1">
                  <span>Détails Symétrie -</span> {postInfo.symetrieExplanation}{" "}
                </p>
              </div>
              <div className="postDetailsExamsTwo">
                <h3>
                  <span></span>Examen des ATM
                </h3>

                {postInfo.examenAtmNormal === "true" && (
                  <p className="my-1">
                    <span>Normal -</span>{" "}
                    {postInfo.examenAtmNormal === "true" ? (
                      <CheckCircleIcon />
                    ) : (
                      <UnpublishedIcon />
                    )}
                  </p>
                )}

                {postInfo.examenAtmDouleur === "true" && (
                  <p className="my-1">
                    <span>Douleur -</span>{" "}
                    {postInfo.examenAtmDouleur === "true" ? (
                      <CheckCircleIcon />
                    ) : (
                      <UnpublishedIcon />
                    )}
                  </p>
                )}

                {postInfo.examenAtmClaquement === "true" && (
                  <p className="my-1">
                    <span>Claquement -</span>{" "}
                    {postInfo.examenAtmClaquement === "true" ? (
                      <CheckCircleIcon />
                    ) : (
                      <UnpublishedIcon />
                    )}
                  </p>
                )}

                {postInfo.examenAtmAutre === "true" && (
                  <p className="my-1">
                    <span>Autres -</span>{" "}
                    {postInfo.examenAtmAutre === "true" ? (
                      <CheckCircleIcon />
                    ) : (
                      <UnpublishedIcon />
                    )}
                  </p>
                )}

                {postInfo.examenAtmAutre.length > 1 && (
                  <p className="my-1">
                    <span>Explication -</span>{" "}
                    {postInfo.examenAtmAutreExplanation}{" "}
                  </p>
                )}
              </div>
              <div className="postDetailsExamsThree">
                <h3>Examens Fonctionnels</h3>
                <h4>Respiration</h4>

                <p className="my-1">
                  <span>Type -</span> {postInfo.respirationType}{" "}
                </p>

                {postInfo.detailsRespiration.length > 1 && (
                  <p className="my-1">
                    <span>Détails -</span> {postInfo.detailsRespiration}{" "}
                  </p>
                )}

                <h4>Mastication</h4>
                <p className="my-1">
                  <span>Type -</span> {postInfo.mastication}{" "}
                </p>

                {postInfo.detailsMastication.length > 1 && (
                  <p className="my-1">
                    <span>Détails -</span> {postInfo.detailsMastication}{" "}
                  </p>
                )}

                <h4>Déglutition</h4>

                <p className="my-1">
                  <span>Type -</span> {postInfo.deglutition}{" "}
                </p>
                {postInfo.detailsDeglutition.length > 1 && (
                  <p className="my-1">
                    <span>Détails -</span> {postInfo.detailsDeglutition}{" "}
                  </p>
                )}
              </div>
            </div>
            <p className="my-1 postImagesContainer">
              {postInfo.postImage && (
                <div>
                  {/* <img
                    className="postImage"
                    src={`${
                      process.env.REACT_APP_BASE_URL + "/" + postInfo.postImage
                    }`}
                    alt="dentistUpProfilePicture"
                  /> */}

                  {/* LIBRARY SOURCE URL 
https://www.npmjs.com/package/react-fullscreen-image */}

                  <ImageGroup>
                    <ul className="images">
                      {images.map((i) => (
                        <li key={i}>
                          <Image
                            src={i}
                            alt="dentistup"
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              height: "100%",
                              width: "85%",
                              objectFit: "contain",
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </ImageGroup>
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default PostDetails;
