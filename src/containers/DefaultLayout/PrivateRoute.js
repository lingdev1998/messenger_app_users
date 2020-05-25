import React, { Component, useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import { checkAuthTokenLocalStorage } from './../../reducers/authentication';

export const PrivateRoute = ({ component: Component, isAuthenticated,checkAuthTokenLocalStorage, ...rest }) => {
  useEffect(() => {
    checkAuthTokenLocalStorage();
  },[])
  return <Route
    {...rest}
    render={props => {
      return isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
    }}
  />
}


const mapStateToProps = ({ authentication }) => ({
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { checkAuthTokenLocalStorage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);