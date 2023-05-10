import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  const [searchKeyword, setSearchKeyword] = React.useState("");

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.user &&
      profile.user.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="grey-bg">
          <h1 className="large text-primary">Dentists</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            other dentists
          </p>
          <input
          id="searchPosts"
        type="text"
        placeholder="Search profiles..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
          <div className="profiles">
      
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
               profile.user &&  <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles found...</h4>
            )}
          </div>
          </div>

     
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
