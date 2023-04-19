import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getGroup } from "../../actions/group";
import GroupItem from "../groups/GroupItem";
import { Link } from "react-router-dom";
// import CommentForm from "./CommentForm";
// import CommentItem from "./CommentItem";

const Group = ({ getGroup, group: { group, loading }, match }) => {
  useEffect(() => {
    getGroup(match.params.id);
  }, [getGroup, match.params.id]);

  return loading || group === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/groups" className="btn btn-primary">
        Back to All Groups
      </Link>
      <GroupItem group={group} showActions={false} showDetails={true} getGroup={getGroup} match={match}/>
      {/* <CommentForm postId={group._id} />
      <h1 className="my-1">Comments</h1>
      <div className="comments">
        {group.comments.map((comment) => (
   
          <CommentItem key={comment._id} comment={comment} postId={group._id} getGroup={getGroup} match={match}/>
       
        ))}
      </div> */}
    </Fragment>
  );
};

Group.propTypes = {
  getGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.post,
});

export default connect(mapStateToProps, { getGroup })(Group);
