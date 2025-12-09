import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSqeure = axios.create({ baseURL: "http://localhost:3000" });

const useAxiosSqeure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  // console.log(user);

  useEffect(() => {
    // request
    const axiosReq = axiosSqeure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    // respons
    const axiosRes = axiosSqeure.interceptors.response.use(
      (respons) => {
        return respons;
      },
      (err) => {
        if (err.status === 401) {
          signOutUser().then(() => {
            navigate('/login');
          });
        }
        if(err.status === 403) {
          return navigate('/')
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSqeure.interceptors.request.eject(axiosReq);
      axiosSqeure.interceptors.response.eject(axiosRes);
    };
  }, [user?.accessToken, signOutUser, navigate]);

  return axiosSqeure;
};

export default useAxiosSqeure;
