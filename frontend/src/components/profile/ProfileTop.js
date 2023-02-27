import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    status,
    speciality,
    company,
    location,
    website,
    social,
    user: { name, avatar, _id },
  },
  posts,
}) => {
  return (
    <div className="profile-top-container bg-light">
      <img className="round-img my-1" src={avatar} alt="" />
      <div className="profile-top p-2">
        <h1 className="large">{name}</h1>
        <p className="lead">
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="lead">{speciality} speciality</p>
        <p>{location && <span>{location}</span>}</p>
        <p>
          <span className="btn-round">500+ Connections</span>
          <span className="btn-round">
            {/* we will compare _id with posts.user */}
            {
              posts.filter((g) => _id?.includes(g.user)).map((g) => g.user)
                .length
            }{" "}
            Cases
          </span>
        </p>
        <div className="icons my-1">
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
          )}
          {social && social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          )}
          {social && social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
          )}
          {social && social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          )}
          {social && social.youtube && (
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
          )}
          {social && social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          )}
        </div>
      </div>
      <div>
        <button className="btn-round">+ Follow</button>{" "}
        <button className="btn-round">test</button>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
