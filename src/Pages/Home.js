import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserStart,
  loadUserStart,
} from "../ReduxState/actions/UserActions";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
} from "mdb-react-ui-kit";
import "../App.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal/lib/components/Modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeUserId, setActiveUserId] = useState(0);
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userData);
  let subtitle;
  useEffect(() => {
    dispatch(loadUserStart());
  }, []);

  useEffect(() => error && toast.error(error), [error]);

  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: "150px" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  const openModal = (id) => {
    setIsModalOpen(true);
    setActiveUserId(id)
  };

  const closeModal = () => {
    setIsModalOpen(false);
    return false;
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
    subtitle.style.paddingTop = "5px";
  };

  const handleDelete = (id) => {
    if (isModalOpen) {
      setIsModalOpen(false);
      dispatch(deleteUserStart(id));
      toast.success("User Deleted Successfully.!");
      setActiveUserId(0);
    }
  };

  return (
    <div className="container" style={{ marginTop: "70px" }}>
      {users.length > 0 ? (
        <>
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </MDBTableHead>
            {users &&
              users.map((item, index) => (
                <MDBTableBody key={index}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>
                      <MDBBtn
                        className="m-1"
                        tag="a"
                        color="none"
                        onClick={() => openModal(item.id)}
                      >
                        <MDBTooltip title="Delete" tag="a">
                          <MDBIcon
                            fas
                            icon="trash"
                            style={{ color: "#dd4b33" }}
                            size="lg"
                          />
                        </MDBTooltip>{" "}
                        {""}
                      </MDBBtn>
                      <Link to={`/editUser/${item.id}`}>
                        <MDBTooltip title="Edit" tag="a">
                          <MDBIcon
                            fas
                            icon="pen"
                            style={{
                              color: "#55acae",
                              marginBottom: "10px",
                              paddingLeft: "10px",
                            }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </Link>
                      <Link to={`/userInfo/${item.id}`}>
                        <MDBTooltip title="View" tag="a">
                          <MDBIcon
                            fas
                            icon="eye"
                            style={{
                              color: "#3b5938",
                              marginBottom: "10px",
                              paddingLeft: "10px",
                            }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </Link>
                    </td>
                  </tr>
                </MDBTableBody>
              ))}
          </MDBTable>
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5 style={{paddingTop: '5px'}}>Delete Confirmation.!!</h5>
                <button
                  style={{
                    border: "none",
                    background: "none",
                    fontSize: "20px",
                    paddingBottom: "5px",
                  }}
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
              <hr />
              <p>Are you sure you want to delete the user from the contact ?</p>
              <hr />
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <MDBBtn onClick={closeModal} color="primary">
                    Cancel
                  </MDBBtn>
                  <MDBBtn onClick={() => handleDelete(activeUserId)} color="danger">
                    Delete
                  </MDBBtn>
                </div>
              </div>
            </Modal>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h3>Oooops.. Seems don't have contact in space.</h3>
          <h5>Please add new user contact.!</h5>
          <Link to="/addUser">
            <MDBBtn style={{ marginTop: "20px" }}>Add User</MDBBtn>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
