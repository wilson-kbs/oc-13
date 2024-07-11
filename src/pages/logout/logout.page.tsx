import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../app/slices/authSlice";

const LogoutPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("accessToken");
    dispatch(setAuthenticated(false));
  }, [dispatch]);

  return <Navigate to="/signin" replace />;
};

export default LogoutPage;
