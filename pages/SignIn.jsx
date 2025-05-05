import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, authState } from "../Redux/authSlice";
import { ToastContainer, toast,Bounce } from "react-toastify";
const SignIn = () => {
  //Local state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //to dispatch actions
  const dispatch = useDispatch();

  // getting state for slice to add loading effect and display error message to user
  const state = useSelector(authState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    //triggering login action
    dispatch(loginAsync(data));
    //reseting form data
    setEmail(""), setPassword("");
  };
  useEffect(() => {
    console.log("the satets are ", state);
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter Email</label>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Enter Passowrd</label>
        <input
          type="text"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
      
      {
        // Conditional rendering of loading state
        state.isLoading?<dialog id="Loader">Loading...</dialog>:null
      }
      {/* Toast container configurations*/}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default SignIn;
