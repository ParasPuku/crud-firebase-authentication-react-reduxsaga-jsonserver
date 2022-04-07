import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { signOutUser } from "../ReduxState/actions/UserActions";

const Header = ({ uid, userSignOut }) => {
  const [showBasic, setShowBasic] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  let userName = user?.email && user?.email.split("@")[0];
  const auth = getAuth();
  let currentUsr = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (currentUsr) => {
      setUser(currentUsr);
      console.log("CURRENT USER", user);
    });
    const exitingMail = user?.email;
    if (exitingMail !== undefined && exitingMail.includes(".com") === true) {
      navigate("/");
    }
  }, [user]);

  const usrSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("SIGNED OUT successfully");
        const emptyObj = {};
        userSignOut(emptyObj);
        navigate("/signin");
      })
      .catch((error) => {
        console.log("SIGNOUT ERROR::", error.message);
      });
  };

  const handlePage = () => {
    navigate("/signin");
  };

  return (
    <>
      <MDBNavbar expand="lg" light bgColor="primary">
        <MDBContainer fluid>
          <MDBNavbarBrand className="text-white">
            <span style={{ marginRight: "10px" }}>
              <MDBIcon fas icon="book-open"></MDBIcon>
            </span>
            User Contact
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="text-white"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link">
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link">
                  <NavLink to="/addUser" className="text-white">
                    Add User
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link">
                  <NavLink
                    onClick={handlePage}
                    to="/about"
                    className="text-white"
                  >
                    About
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav
              style={{ justifyContent: "right", marginRight: "40px" }}
              className="mr-3"
            >
              {!uid ? (
                <MDBNavbarItem>
                  <MDBNavbarLink className="nav-link">
                    <NavLink to="/signin" className="text-white">
                      SignIn
                    </NavLink>
                    <span className="mt-3 mb-4" style={{ paddingLeft: "10px" }}>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        className="rounded-circle img-fluid"
                        style={{ width: "35px" }}
                        alt="profile-pic"
                      />
                    </span>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              ) : (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink className="nav-link">
                      <NavLink
                        onClick={usrSignOut}
                        to=""
                        className="text-white"
                      >
                        SignOut
                      </NavLink>
                      <span
                        className="mt-3 mb-4"
                        style={{ paddingLeft: "10px" }}
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          className="rounded-circle img-fluid"
                          style={{ width: "35px" }}
                          alt="profile-pic"
                        />
                        <span
                          className="currentEmail"
                          style={{
                            fontSize: "12px",
                            color: "#fff",
                            paddingTop: "12px",
                            paddingLeft: "10px",
                          }}
                        >
                          <span className="userName">Hello,</span>{" "}
                          <span>{userName}</span>
                        </span>
                      </span>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
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
  // const userId = state?.userData?.uid?.user?.uid;
  console.log("HEADER STATE :: ", state);
  return {
    uid: state?.userData?.uid?.user?.uid,
    email: state?.userData?.uid?.user?.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userSignOut: (emptyObj) => dispatch(signOutUser(emptyObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
