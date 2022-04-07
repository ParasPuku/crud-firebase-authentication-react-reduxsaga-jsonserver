import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  } from "firebase/auth";
import { MDBBtn, MDBInput, MDBValidation } from "mdb-react-ui-kit";
import { useState } from "react";
import { auth } from "../../firebase.config";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signInUser } from "../../ReduxState/actions/UserActions";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";

const SignIn = ({ uid, signedIn }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const navigate = useNavigate();

  const googleSignIn = async (e) => {
    e.preventDefault();
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const userInfo = await signInWithEmailAndPassword(
        auth,
        signInEmail,
        signInPassword
      );
      signedIn(userInfo);
      console.log("User Sign In :: ", userInfo);
      console.log("UID ::", uid);
      console.log("USER::", auth.currentUser.email);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const onInputChange = (e) => {
    if (e.target.name === "email") {
      setSignInEmail(e.target.value);
    } else if (e.target.name === "password") {
      setSignInPassword(e.target.value);
    }
  };

  return (
    <>
      <MDBValidation
        className="row g-3"
        style={{ marginTop: "30px" }}
        noValidate
        onSubmit={handleSubmit}
      >
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
        >
          <h3 className="fs-2 fw-bold">{"Sign In"}</h3>
          <label style={{ display: "flex", justifyContent: "flex-start" }}>
            Email Address
          </label>
          <MDBInput
            value={signInEmail || ""}
            name="email"
            type="email"
            onChange={onInputChange}
            required
            label="you@example.com"
            // placeholder="You@example.com"
            validation="Please provide an email"
            invalid
          />
          <br />
          <label style={{ display: "flex", justifyContent: "flex-start" }}>
            Password
          </label>
          <MDBInput
            value={signInPassword || ""}
            name="password"
            type="password"
            onChange={onInputChange}
            required
            label="Enter 6 character or more"
            // placeholder="Enter 6 character or more"
            validation="Please provide password"
            invalid
          />
          <br />
          <div className="col-12">
            <MDBBtn type="submit" style={{ width: "100%" }}>
              Sign In
            </MDBBtn>
            <p className="p-2">
              Doesn't have an account yet?{" "}
              <Link to={"/signup"} style={{ textDecoration: "underline" }}>
                Sign Up Now.
              </Link>
            </p>
          </div>
          <p>OR</p>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={googleSignIn}
            style={{ width: "370px" }}
          />
        </div>
      </MDBValidation>
    </>
  );
};

const mapStateToProps = (state) => {
  // const {
  //   userData: {
  //     uid: {
  //       user: { uid: userId },
  //     },
  //   },
  // } = state;
  const userId = state?.userData?.uid?.user?.uid;
  console.log("SIGNIN STATE :: ", state);
  return {
    uid: userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signedIn: (uid) => dispatch(signInUser(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
