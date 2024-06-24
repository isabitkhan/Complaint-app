import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => setError(err.response?.data || err.message));
  }, []);

  if (error) {
    return (
      <div className="content-wrapper">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="row">
          <div className="container-fluid col-md-8">
            <div className="card mt-5">
              <div className="card-header">
                <h3 className="card-title">Users List</h3>
              </div>
              <div className="card-body">
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <Link to="/" className="btn btn-primary">
                  Complaints
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;
