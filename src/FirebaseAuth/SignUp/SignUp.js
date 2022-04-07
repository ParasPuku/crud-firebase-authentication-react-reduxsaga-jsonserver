import { createUserWithEmailAndPassword } from "firebase/auth";
import { MDBBtn, MDBInput, MDBValidation } from "mdb-react-ui-kit";
import { useState } from "react";
import { auth } from "../../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

const SignUp = () => {
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        createEmail,
        createPassword
      );
      console.log("User Sign Up :: ", user);
      setTimeout(() => {
        toast.success('User Id created successfully..Please Sign in Now!')
        navigate('/signin')

      }, 100);
    } catch (error) {
      console.log(error.message);
    }
  };
  const onInputChange = (e) => {
    if (e.target.name === "email") {
      setCreateEmail(e.target.value);
    } else if (e.target.name === "password") {
      setCreatePassword(e.target.value);
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
          <h3 className="fs-2 fw-bold">{"Sign Up"}</h3>
          <label style={{ display: "flex", justifyContent: "flex-start" }}>
            Email Address
          </label>
          <MDBInput
            value={createEmail || ""}
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
            value={createPassword || ""}
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
            <MDBBtn style={{ width: "100%" }} type="submit">
              Sign Up
            </MDBBtn>
            <p className="p-2">
              Already an existing user,{" "}
              <Link to={"/signin"} style={{ textDecoration: "underline" }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </MDBValidation>
    </>
  );
};

export default SignUp;
