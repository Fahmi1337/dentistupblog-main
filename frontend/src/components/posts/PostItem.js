import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";


const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, postInfo, name, avatar, user, likes, comments, date },
  showActions,
  showDetails,
  showUserPosts,
  postsByUserId,
}) => {
  return (
    <div className="posts">
      {showUserPosts && user === postsByUserId && (
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{postInfo.title}</p>
          <p className="my-1">
            {postInfo.description?.slice(0, 200) +
              (postInfo.description?.length > 200 ? "..." : "")}
          </p>
          <p className="post-date">
            Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
          </p>

          {showActions && (
            <Fragment>
              <button
                onClick={() => addLike(_id)}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-up" />{" "}
                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
              </button>
              <button
                onClick={() => removeLike(_id)}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-down" />
              </button>
              <Link to={`/posts/${_id}`} className="btn btn-primary">
                Discussion{" "}
                {comments.length > 0 && (
                  <span className="comment-count">{comments.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={(e) => deletePost(_id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
          
            </Fragment>
          )}
          {showDetails && (
            <Fragment>
              <div>
                <p className="my-1">Post Details : </p>
                <p className="my-1"> Title : {postInfo.title} </p>
                <p className="my-1"> Description : {postInfo.description} </p>
                <p className="my-1">
                  {" "}
                  bloodPressure : {postInfo.bloodPressure}{" "}
                </p>
                <p className="my-1">
                  dailyMedications : {postInfo.dailyMedications}{" "}
                </p>
                <p className="my-1">dateOfBirth : {postInfo.dateOfBirth} </p>
                <p className="my-1">
                  deglutitionAtypique : {postInfo.deglutitionAtypique}{" "}
                </p>
                <p className="my-1">
                  deglutitionTypique : {postInfo.deglutitionTypique}{" "}
                </p>
                <p className="my-1">
                  {" "}
                  dentalHistory : {postInfo.dentalHistory}
                </p>
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
                <p className="my-1">
                  examenAtmAutre : {postInfo.examenAtmAutre}{" "}
                </p>
                <p className="my-1">
                  examenAtmAutreExplanation :
                  {postInfo.examenAtmAutreExplanation}{" "}
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
                <p className="my-1">
                  examenExoBuccal: {postInfo.examenExoBuccal}{" "}
                </p>
                <p className="my-1">
                  extraoralExamination : {postInfo.extraoralExamination}{" "}
                </p>
                <p className="my-1"> gender : {postInfo.gender}</p>
                <p className="my-1">
                  intraoralExamination : {postInfo.intraoralExamination}{" "}
                </p>
                <p className="my-1">
                  masticationBilateral : {postInfo.masticationBilateral}{" "}
                </p>
                <p className="my-1">
                  masticationUnilateral: {postInfo.masticationUnilateral}{" "}
                </p>
                <p className="my-1">
                  medicalHistory: {postInfo.medicalHistory}{" "}
                </p>
                <p className="my-1">
                  patientReference: {postInfo.patientReference}{" "}
                </p>
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
            </Fragment>
          )}
        </div>
      </div>
        )}
        {!showUserPosts && (
           <div className="post bg-white p-1 my-1">
           <div>
             <Link to={`/profile/${user}`}>
               <img className="round-img" src={avatar} alt="" />
               <h4>{name}</h4>
             </Link>
           </div>
           <div>
             <p className="my-1">{postInfo.title}</p>
             <p className="my-1">
               {postInfo.description?.slice(0, 200) +
                 (postInfo.description?.length > 200 ? "..." : "")}
             </p>
             <p className="post-date">
               Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
             </p>
   
             {showActions && (
               <Fragment>
                 <button
                   onClick={() => addLike(_id)}
                   type="button"
                   className="btn btn-light"
                 >
                   <i className="fas fa-thumbs-up" />{" "}
                   <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                 </button>
                 <button
                   onClick={() => removeLike(_id)}
                   type="button"
                   className="btn btn-light"
                 >
                   <i className="fas fa-thumbs-down" />
                 </button>
                 <Link to={`/posts/${_id}`} className="btn btn-primary">
                   Discussion{" "}
                   {comments.length > 0 && (
                     <span className="comment-count">{comments.length}</span>
                   )}
                 </Link>
                 {!auth.loading && user === auth.user._id && (
                   <button
                     onClick={(e) => deletePost(_id)}
                     type="button"
                     className="btn btn-danger"
                   >
                     <i className="fas fa-times"></i>
                   </button>
                 )}
              
               </Fragment>
             )}
             {showDetails && (
               <Fragment>
                 <div>
                   <p className="my-1">Post Details : </p>
                   <p className="my-1"> Title : {postInfo.title} </p>
                   <p className="my-1"> Description : {postInfo.description} </p>
                   <p className="my-1">
                     {" "}
                     bloodPressure : {postInfo.bloodPressure}{" "}
                   </p>
                   <p className="my-1">
                     dailyMedications : {postInfo.dailyMedications}{" "}
                   </p>
                   <p className="my-1">dateOfBirth : {postInfo.dateOfBirth} </p>
                   <p className="my-1">
                     deglutitionAtypique : {postInfo.deglutitionAtypique}{" "}
                   </p>
                   <p className="my-1">
                     deglutitionTypique : {postInfo.deglutitionTypique}{" "}
                   </p>
                   <p className="my-1">
                     {" "}
                     dentalHistory : {postInfo.dentalHistory}
                   </p>
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
                   <p className="my-1">
                     examenAtmAutre : {postInfo.examenAtmAutre}{" "}
                   </p>
                   <p className="my-1">
                     examenAtmAutreExplanation :
                     {postInfo.examenAtmAutreExplanation}{" "}
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
                   <p className="my-1">
                     examenExoBuccal: {postInfo.examenExoBuccal}{" "}
                   </p>
                   <p className="my-1">
                     extraoralExamination : {postInfo.extraoralExamination}{" "}
                   </p>
                   <p className="my-1"> gender : {postInfo.gender}</p>
                   <p className="my-1">
                     intraoralExamination : {postInfo.intraoralExamination}{" "}
                   </p>
                   <p className="my-1">
                     masticationBilateral : {postInfo.masticationBilateral}{" "}
                   </p>
                   <p className="my-1">
                     masticationUnilateral: {postInfo.masticationUnilateral}{" "}
                   </p>
                   <p className="my-1">
                     medicalHistory: {postInfo.medicalHistory}{" "}
                   </p>
                   <p className="my-1">
                     patientReference: {postInfo.patientReference}{" "}
                   </p>
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
               </Fragment>
             )}
           </div>
         </div>
        )}
     
        
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
  showDetails: true,
  showUserPosts: false,
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
