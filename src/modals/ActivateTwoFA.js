import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { local_url } from "..";
import axios from "axios";

const ActivateTwoFA = (props) => {
  const [QR, setQR] = useState([]);
  const [OTP, setOTP] = useState("");
  const [success, setSuccess] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const response = await axios.get(`${local_url}two-fa`, {
          params: { user_id },
        });
        setQR(response?.data?.data);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else {
          console.error("Error message:", error.message);
        }
      }
    };
    fetchData();
  }, []);

  const handleOTP = async () => {
    if (!OTP || OTP.length < 6) {
      return alert("OTP has to be 6 digits");
    }
    const user_id = localStorage.getItem("user_id");
    const user_data = {
      otp: OTP,
      user_id,
    };
    try {
      const response = await axios.post(`${local_url}verify`, user_data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setSuccess(1);
        alert("OTP activated successfully");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        error.response.data.message === "Invalid 2FA token"
          ? alert(error.response.data.message)
          : console.log("");
      } else {
        console.error("Error message:", error.message);
      }
    }
    return;
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Activate 2FA
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h4>
              With your authenticator app, scan the code and input OTP to
              activate 2FA
            </h4>
            <p>
              With your authenticator app, scan the code and input OTP to
              activate 2FA
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <img className="img-fluid" src={QR?.data_url} alt="" />
          </div>
          <div className="text-center" size={6}>
            <input
              type="number"
              onChange={(e) => {
                setOTP(e.target.value);
              }}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOTP}
            >
              Validate
            </button>
          </div>
          {/* <p></p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActivateTwoFA;
