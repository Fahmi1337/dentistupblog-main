import React, { useState } from 'react';
import { addGroup } from "../../actions/group";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const GroupForm = ({addGroup}) => {



    const handleInputData = (input) => (e) => {
        // input value from the form
        const { value } = e.target;
    
        //updating for data state taking previous state and then adding new value to create new object
        setFormData((prevState) => ({
          ...prevState,
          [input]: value,
        }));
      };


  const [formData, setFormData] = useState({
    title: "",
    description: "",})

    const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formData?", formData)
    addGroup(formData);
  }


    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text"   onChange={handleInputData("title")} />
        </div>
        <div>
          <label>Description:</label>
          <textarea  onChange={handleInputData("description")} />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }


  GroupForm.propTypes = {
    addGroup: PropTypes.func.isRequired,
  };
  
  export default connect(null, { addGroup })(GroupForm);