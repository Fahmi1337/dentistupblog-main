import React, { useState, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CommentForm = ({ postId, addComment }) => {
  // const [text, setText] = useState("");
  const [formData, setFormData] = useState({
    diagnostic: "",
    treatment: "",
  });

  const handleFormData = (input) => (e) => {
    // input value from the form
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      diagnostic: "",
      treatment: "",
    });
  };

  return (
    <div>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a Comment should you feel like it!</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();

            addComment(postId, { formData });
            handleReset();
          }}
        >
          <textarea
            name="diagnostic"
            cols="30"
            rows="5"
            placeholder="Diagnostic"
            value={formData.diagnostic}
            onChange={handleFormData("diagnostic")}
            required
          ></textarea>
          {/* <textarea
            name="treatment"
            cols="30"
            rows="5"
            placeholder="Treatment"
            value={formData.treatment}
            onChange={handleFormData("treatment")}
            required
          ></textarea> */}
          {/* <Editor /> */}

          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
