import {React, useEffect} from "react";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import { getPosts } from "../../actions/post";
import { Link } from "react-router-dom";
const MyCases = ({
    getProfileById,
    profile: { profile, loading },
    getPosts,
    post: { posts },
    auth,
    match,
    _id
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
      }, [getProfileById, match.params.id]);
      useEffect(() => {
        getPosts();
      }, [getPosts]);

      const renderedCurrentUserPosts = posts.map((post) => (
        <PostItem key={post._id} post={post} showDetails={false} postsByUserId={auth.user._id} showUserPosts={true}/>
      ));

      const getUserPostsCount = () => {
return  posts.filter((g) => auth.user._id?.includes(g.user)).map((g) => g.user)
.length
      }
  return (
    

 
    
      
      <div >
      {/* {posts.map((post, index) => (
    
          <PostItem key={post._id} post={post} showDetails={false} postsByUserId={auth.user._id} showUserPosts={true}/>
     
        ))} */}
      
      {getUserPostsCount() > 0 ? (
  renderedCurrentUserPosts
) : (
  <h3>You don't have any posts yet, to start you can add your first post <Link to="/posts" >
  here
</Link></h3> 
)}

  {/* we will compare _id with posts.user */}
  {
             
            }

      </div>
  
  );
};
MyCases.propTypes = {
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
  
  export default connect(mapStateToProps, { getProfileById, getPosts })(MyCases);
