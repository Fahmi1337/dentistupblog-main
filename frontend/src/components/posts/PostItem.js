import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import PostDetails from "./PostDetails";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, postInfo, name, avatar, user, likes, comments, date, profileImage },
  showActions,
  showDetails,
  showUserPosts,
  postsByUserId,
  getPost,
  match
}) => {
  
  return (
    <div className="posts">
      {showUserPosts && user === postsByUserId && (
        <div>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${user}`}>
                <img className="round-img" src={profileImage ? `${process.env.REACT_APP_BASE_URL +"/" + profileImage}` : avatar} alt="Dentistup" />
                <h4>{name}</h4>
              </Link>
            </div>
            <div>
              <h2 className="my-1">{postInfo.title}</h2>
              {!showDetails && (
                <p className="my-1">
                  {postInfo.description?.slice(0, 200) +
                    (postInfo.description?.length > 200 ? "..." : "")}
                </p>
              )}
              <p className="post-date">
                Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
              </p>

              <Fragment>
                  <button
                    onClick={() => addLike(_id)}
                    type="button"
                    className="btn btn-light"
                  >
                    <i className="fas fa-thumbs-up" />{" "}
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </button>
                  <button
                    onClick={() => removeLike(_id)}
                    type="button"
                    className="btn btn-light"
                  >
                    <i className="fas fa-thumbs-down" />
                  </button>
             
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
              {showActions && (
                <Fragment>
          
                  <Link to={`/posts/${_id}`} className="btn btn-primary">
                    Discussion{" "}
                    {comments.length > 0 && (
                      <span className="comment-count">{comments.length}</span>
                    )}
                  </Link>
                
                </Fragment>
              )}
            </div>
          </div>
          {showDetails && (
     
            <PostDetails
              postInfo={postInfo}
              auth={auth}
              user={user}
              deletePost={deletePost}
              _id={_id}
              getPost={getPost} match={match}
            />
          )}
        </div>
      )}

      {!showUserPosts && (
        <div>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${user}`}>
                <img className="round-img" src={profileImage ? `${process.env.REACT_APP_BASE_URL +"/" + profileImage}` : avatar} alt="Dentisup" />
                <h4>{name}</h4>
              </Link>
            </div>
            <div>
              <h2 className="my-1">{postInfo.title}</h2>
              {!showDetails && (
                <p className="my-1">
                  {postInfo.description?.slice(0, 200) +
                    (postInfo.description?.length > 200 ? "..." : "")}
                </p>
              )}

              <p className="post-date">
                Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
              </p>
              <Fragment>
                  <button
                    onClick={() => addLike(_id)}
                    type="button"
                    className="btn btn-light"
                  >
                    <i className="fas fa-thumbs-up" />{" "}
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </button>
                  <button
                    onClick={() => removeLike(_id)}
                    type="button"
                    className="btn btn-light"
                  >
                    <i className="fas fa-thumbs-down" />
                  </button>
             
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
              {showActions && (
                <Fragment>
          
                  <Link to={`/posts/${_id}`} className="btn btn-primary">
                    Discussion{" "}
                    {comments.length > 0 && (
                      <span className="comment-count">{comments.length}</span>
                    )}
                  </Link>
                
                </Fragment>
              )}
            </div>
          </div>
          {showDetails && (
            <PostDetails
              postInfo={postInfo}
              auth={auth}
              user={user}
              deletePost={deletePost}
              _id={_id}
              getPost={getPost} match={match}
            />
            
          )}
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
