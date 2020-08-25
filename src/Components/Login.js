import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "../firebase-config";
import { User } from "../App";

function Login() {
  const userdata = useContext(User);
  auth.onAuthStateChanged((status) => {
      userdata.setuser(status);
  });
    
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then()
      .catch(function (error) {
        // Handle Errors here.
        alert(error);
      });
  };

  return(!userdata.user)?
   (
    <div className="Login_container">
      <img src="/WhatsApp-logo.png" alt="WhatsApp-logo" />
      <h3>Welcome to Whatsapp Clone</h3>

      <p>MADE BY KARTIK JETANI</p>
      <Button onClick={signIn}>Sign in with google</Button>
    </div>
  ):(null)
}

export default Login;
