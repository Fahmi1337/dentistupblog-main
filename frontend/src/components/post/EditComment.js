import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {editComment} from "../../actions/post"
const EditComment = ({ postId, _id, comment, editComment, handleCloseEditComment, getPost, match }) => {
  const [formData, setFormData] = useState({
    treatment: "",
    diagnostic: "",
  });

  useEffect(() => {
    setFormData(comment);
  }, [comment]);

  const { treatment, diagnostic } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
   
   editComment(postId, _id, formData );
   handleCloseEditComment();
   getPost(match.params.id);
   getPost(match.params.id);
  };

  return (
    <div>
      <h3>Comment</h3>
     
        <div className="card-body" id="editCommentContainer">
               <form onSubmit={onSubmit} className="form my-1"> 


               <div className="form-group">
        <label className="form-label">Diagnostic</label>
        <textarea
          type="text"
          name="diagnostic"
          value={diagnostic}
          onChange={onChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Treatment</label>
        <textarea
          type="text"
          name="treatment"
          value={treatment}
          onChange={onChange}
          className="form-control"
        />
      </div>
    </form>
              <button type="submit" onClick={onSubmit} className="btn btn-primary"> Update</button>
        </div>
  </div>
                );
            };



EditComment.propTypes = {
              editComment: PropTypes.func.isRequired,
         
            };
    
export default connect(null, { editComment })
(EditComment);