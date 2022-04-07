import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ uid, children }) => {
  if (!uid) {
    return <Navigate to="/signin" />;
  }
  return children;
};
const mapStateToProps = (state) => {
  const userId = state?.userData?.uid?.user?.uid;
  return {
    uid: userId,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
