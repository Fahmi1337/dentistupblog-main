import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileSkills from "./ProfileSkills";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import { getPosts } from "../../actions/post";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  getPosts,
  post: { posts },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        // <Fragment>
        //   <Link to="/profiles" className="btn btn-primary">
        //     Back to Profiles
        //   </Link>
        //   {auth.isAuthenticated &&
        //     auth.loading === false &&
        //     auth.user._id === profile.user._id && (
        //       <Link to="/edit-profile" className="btn btn-dark">
        //         Edit Profile
        //       </Link>
        //     )}

        //   <div className="profile-grid my-1">
        //     <ProfileTop profile={profile} />
        //     <ProfileAbout profile={profile} />

        //     <div className="profile-exp bg-white p-2">
        //       <h2 className="text-primary">Experience</h2>
        //       {profile.experience.length > 0 ? (
        //         <Fragment>
        //           {profile.experience.map((experience) => (
        //             <ProfileExperience
        //               key={experience._id}
        //               experience={experience}
        //             />
        //           ))}
        //         </Fragment>
        //       ) : (
        //         <h4>No experience credentials</h4>
        //       )}
        //     </div>

        //     <div className="profile-edu bg-white p-2">
        //       <h2 className="text-primary">Education</h2>
        //       {profile.education.length > 0 ? (
        //         <Fragment>
        //           {profile.education.map((education) => (
        //             <ProfileEducation
        //               key={education._id}
        //               education={education}
        //             />
        //           ))}
        //         </Fragment>
        //       ) : (
        //         <h4>No education credentials</h4>
        //       )}
        //     </div>

        //     {profile.githubusername && (
        //       <ProfileGithub username={profile.githubusername} />
        //     )}
        //   </div>
        // </Fragment>

        <Fragment>
          {/* <Link to="/profiles" className="btn btn-primary">
            Back to Profiles
          </Link>
          
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )} */}
          <ProfileTop profile={profile} posts={posts} auth={auth} />
          <ProfileAbout profile={profile} />
          <div className="profile-grid my-1">
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {/* {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )} */}

            <ProfileSkills profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getProfileById, getPosts })(Profile);
