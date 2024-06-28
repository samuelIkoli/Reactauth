import React, { useContext, useState, useEffect } from "react";
import ActivateTwoFA from "../modals/ActivateTwoFA";
import { AuthContext, local_url } from "..";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Profile = () => {
  const log = useContext(AuthContext);
  console.log("log is", log.isLoggedIn);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const two_fa = localStorage.getItem("two_fa");
  const username = localStorage.getItem("username");

  return (
    <div className="align-items-center d-flex align-items-center justify-content-center text-center">
      <div className="border p-5 rounded align-items-center container container-fluid">
        <div>
          <h1>Profile</h1>
        </div>
        {two_fa == 0 ? (
          <div>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Activate 2FA
            </Button>
            <ActivateTwoFA
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        ) : (
          <div>
            <h2>Welcome to your dashboard {username}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
