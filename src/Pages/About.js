import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";

const About = () => {
  return (
    <div style={{marginTop: '60px'}}>
      <MDBTypography note noteColor="primary">
          Hey Guys, This is USER Contact application where we can do CRUD operation with the help of ReactJS, Redux Saga, JSON Server, and Material Bootstrap technologies. In this application React Toastify, React Routing v6 have been used. To make HTTP request I have used Axios libraries to do the network call using get, post, delete, and put.
      </MDBTypography>
    </div>
  )
};

export default About;
