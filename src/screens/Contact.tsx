import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import axios from "axios";
import { local_url } from "..";

const Contact = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${local_url}users`);
        setUsers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="align-items-center d-flex align-items-center justify-content-center text-center">
      <div className="border p-5 rounded align-items-center container container-fluid">
        <div>
          <h1>Users</h1>
        </div>
        <div>
          {users.map((user: any) => (
            <div key={user.id}>{user.username}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
