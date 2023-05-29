import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import { getPosts } from "../../actions/post";
import { loadUser } from "../../actions/auth";
import { Link } from "react-router-dom";
const SavedPosts = ({
  getProfileById,
  profile: { profile, loading },
  getPosts,
  post: { posts },
  auth,
  match,
  _id,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  useEffect(() => {
    getPosts();
    loadUser();
  }, [getPosts, auth]);

  var savedPostsIds = [];
  for (var i = 0; i < auth?.user?.savedPosts?.length; i++) {
    savedPostsIds.push(auth?.user?.savedPosts[i]?.post);
  }

  const renderedSavedUserPosts = posts.map((post) => (
    <PostItem
      key={post._id}
      post={post}
      showDetails={false}
      showSavedCases={true}
      savedPostsIds={savedPostsIds}
    />
  ));

  return (
    <div className="grey-bg">
      {auth?.user?.savedPosts?.length > 0 ? (
        renderedSavedUserPosts
      ) : (
        <h3>
          You don't have any saved posts yet, to start you can browse posts{" "}
          <Link to="/posts">here</Link>
        </h3>
      )}
    </div>
  );
};
SavedPosts.propTypes = {
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

export default connect(mapStateToProps, { getProfileById, getPosts })(
  SavedPosts
);
