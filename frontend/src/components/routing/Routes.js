import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Alert from "../layout/Alert";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";

// Route for logged in users
import PrivateRoute from "../routing/PrivateRoute";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";
import MyCases from "../mycases/MyCases";
import SavedPosts from "../savedposts/SavedPosts";
import Groups from "../groups/Groups";
import Group from "../group/Group";
const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/mycases" component={MyCases} />
        <PrivateRoute exact path="/savedposts" component={SavedPosts} />
        <PrivateRoute exact path="/groups" component={Groups} />
        <PrivateRoute exact path="/groups/:id" component={Group} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
