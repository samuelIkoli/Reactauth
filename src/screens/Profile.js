import React from "react";
import ActivateTwoFA from "../modals/ActivateTwoFA";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Profile = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="align-items-center d-flex align-items-center justify-content-center text-center">
      <div className="border p-5 rounded align-items-center container container-fluid">
        <div>
          <h1>Profile</h1>
        </div>
        <div>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Activate 2FA
          </Button>
          <ActivateTwoFA show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
