import React, { useEffect, PropsWithChildren, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../app/slices/authSlice.ts";
import { isTokenValid } from "../utils/auth";

const AuthLoader: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = isTokenValid(token);
      if (isValid) {
        dispatch(setAuthenticated(true));
      } else {
        dispatch(setAuthenticated(false));
        localStorage.removeItem("accessToken");
      }
      setLoading(false);
    };

    checkAuth();
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthLoader;
