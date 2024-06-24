import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ComplaintView = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/complaints/${id}`)
      .then((res) => setComplaint(res.data))
      .catch((err) => setError(err.response?.data || err.message));
  }, [id]);

  if (error) {
    return (
      <div className="content-wrapper">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="content-wrapper">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="row">
          <div className="container-fluid col-md-6">
            <div className="card mt-5">
              <div className="card-header">
                <h3 className="card-title">Complaint Details</h3>
              </div>
              <div className="card-body">
                <p>
                  <strong>Title:</strong> {complaint.title}
                </p>
                <p>
                  <strong>Description:</strong> {complaint.description}
                </p>
                <p>
                  <strong>Created Date:</strong>{" "}
                  {new Date(complaint.createdDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong> {complaint.status}
                </p>
              </div>
              <div className="card-footer">
                <Link to="/Complaints" className="btn btn-primary">
                  Back to List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComplaintView;
