import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

import Spinner from "../layout/Spinner";
const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    website: "",
    location: "",
    bio: "",
    status: "",
    speciality: "",
    // githubusername: "",
    skills: "",
    youtube: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    name: "",
    profileImage: null,
    profileCover: null,
  });
  //   for toggling social inputs on and off
  const [displaySocialInput, toggleSocialInput] = useState(false);
  const [newLoading, setLoading] = useState(false);
  const checkLoading = (e) => {
    if (newLoading) {
      return <Spinner />;
    }
  };
  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile?.company ? "" : profile?.company,
      title: loading || !profile?.title ? "" : profile?.title,
      website: loading || !profile?.website ? "" : profile?.website,
      location: loading || !profile?.location ? "" : profile?.location,
      status: loading || !profile?.status ? "" : profile?.status,
      speciality: loading || !profile?.speciality ? "" : profile?.speciality,
      skills: loading || !profile?.skills ? "" : profile?.skills.join(","),
      // githubusername:
      //   loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile?.bio ? "" : profile?.bio,
      twitter: loading || !profile?.social ? "" : profile?.social?.twitter,
      facebook: loading || !profile?.social ? "" : profile?.social?.facebook,
      linkedin: loading || !profile?.social ? "" : profile?.social?.linkedin,
      youtube: loading || !profile?.social ? "" : profile?.social?.youtube,
      instagram: loading || !profile?.social ? "" : profile?.social?.instagram,
      name: loading || !profile?.user?.name ? "" : profile?.user?.name,
      profileImage:
        loading || !profile?.profileImage ? "" : profile?.profileImage,
      profileCover:
        loading || !profile?.profileCover ? "" : profile?.profileCover,
    });
  }, [loading, getCurrentProfile]);

  // Destructurization
  const {
    company,
    website,
    location,
    bio,
    status,
    speciality,
    // githubusername,
    title,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    name,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   createProfile(formData, history, true);
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    // data.append("profileImage", formData.profileImage);
    // Object.keys(formData).forEach((key) => {
    //   if (key !== "profileImage") {
    //     data.append(key, formData[key]);
    //   }
    // });

    data.append("profileCover", formData.profileCover);
    Object.keys(formData).forEach((key) => {
      if (key !== "profileCover") {
        data.append(key, formData[key]);
      }
    });
    createProfile(data, history, true);
    setLoading(true);
  };
  console.log("formData?", formData);
  return (
    <div className="whitebg" style={{ margin: 20 }}>
      <Fragment>
        {checkLoading()}
        <h1 className="large text-primary">Edit Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Edit some information to make your
          profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="profileImage">Profile Picture</label>
            <small className="form-text">Upload a profile picture</small>
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              name="profileImage"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  profileImage: e.target.files[0],
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="profileCover">Profile Cover</label>
            <small className="form-text">Upload a profile cover</small>
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              name="profileCover"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  profileCover: e.target.files[0],
                })
              }
            />
          </div>
          <div className="form-group">
            <select name="status" value={status} onChange={(e) => onChange(e)}>
              <small className="form-text">
                Give us an idea of where you are at in your career
              </small>
              <option value="0">* Select Professional Status</option>
              <option value="Dentist">Dentist</option>
              <option value="Junior Dentist">Junior Dentist</option>
              <option value="Senior Dentist">Senior Dentist</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Dr.">Dr.</option>
            </select>
          </div>

          <div className="form-group">
            <small className="form-text">
              Give us an idea of where you are at in your speciality
            </small>
            <select
              name="speciality"
              value={speciality}
              onChange={(e) => onChange(e)}
            >
              <option value="0">* Select Professional Speciality</option>
              <option value="Endodontie">Endodontie</option>
              <option value="Parodontie">Parodontie</option>
              <option value="Orthodontie">Orthodontie</option>
              <option value="Implantologie">Implantologie</option>
              <option value="Esthétique">Esthétique</option>
              <option value="Généraliste">Généraliste</option>
            </select>
          </div>
          <div className="form-group">
            <small className="form-text">Name</small>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">Title</small>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">
              Could be your own company or one you work for
            </small>
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">
              Could be your own or a company website
            </small>
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">
              City & state suggested (eg. Moanstir, Sousse)
            </small>
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">
              Please use comma separated values (eg.
              skill1,skill2,skill3,skill4)
            </small>
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={(e) => onChange(e)}
            />
          </div>
          {/* <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Title</small>
        </div> */}

          <div className="form-group">
            <small className="form-text">Tell us a little about yourself</small>
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>

          <div className="my-2">
            <button
              onClick={() => toggleSocialInput(!displaySocialInput)}
              type="button"
              className="btn btn-light"
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>
          {/* will only display if we toggle social inputs on and off */}
          {displaySocialInput && (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </Fragment>
          )}

          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </Fragment>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
