// This file contains the function that makes the login request to the server.
// It takes the userCredentials and the dispatch function as arguments.
// It sends a POST request to the /auth/login endpoint with the userCredentials.
// If the request is successful, it dispatches the LOGIN_SUCCESS action with the user data.
// If there is an error, it dispatches the LOGIN_FAILURE action with the error.

import axios from "axios";

export const LoginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" }); // Dispatches action indicating login start

    try {
        // Send POST request to server's /auth/login endpoint with user credentials
        const res = await axios.post("/auth/login", userCredentials);

        // Dispatch action with user data upon successful login
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
        // Dispatch action with error payload upon login failure
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};
