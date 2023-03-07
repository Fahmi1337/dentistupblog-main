import {React, useEffect} from "react";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import { getPosts } from "../../actions/post";

const MyQuestions = ({
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
    

 
    
      
      <div >
      {posts.map((post) => (
          <PostItem key={post._id} post={post} showDetails={false} postsByUserId={auth.user._id} showUserPosts={true}/>
        ))}
      

      </div>
  
  );
};
MyQuestions.propTypes = {
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
  
  export default connect(mapStateToProps, { getProfileById, getPosts })(MyQuestions);
