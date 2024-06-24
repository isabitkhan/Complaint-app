import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import axios, { CanceledError } from "axios";
import useCount from "../context/context";

const Complaints = () => {
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editComplaintData, setEditComplaintData] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const {todoCount} = useCount()

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("http://localhost:3000/api/complaints", {
        signal: controller.signal,
      })  
      .then((res) => {
        setComplaints(res.data);
        console.log(complaints.length);
        console.log(todoCount);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, []);

  const addComplaint = async (complaintData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/complaints",
        complaintData
      );
      setComplaints([...complaints, response.data]);
      console.log(response);
      setShowForm(false);
      setError("");
    } catch (error) {
      setError(error.response?.data || error.message);
    }
  };

  const editComplaint = async (complaintData) => {
    try {
      await axios.put(
        `http://localhost:3000/api/complaints/${complaintData._id}`,
        complaintData
      );
      const updatedComplaints = complaints.map((complaint) =>
        complaint._id === complaintData._id ? complaintData : complaint
      );
      setComplaints(updatedComplaints);
      setShowEditForm(false);
      setEditComplaintData(null);
      setError("");
    } catch (error) {
      setError(error.response?.data || error.message);
    }
  };

  const deleteComplaint = async (complaintId) => {
    try {
      await axios.delete(`http://localhost:3000/api/complaints/${complaintId}`);
      const updatedComplaints = complaints.filter(
        (complaint) => complaint._id !== complaintId
      );
      setComplaints(updatedComplaints);
      setError("");
    } catch (error) {
      setError(error.response?.data || error.message);
    }
  };

  const handleEditButtonClick = (complaint) => {
    setEditComplaintData(complaint);
    setShowEditForm(true);
    setShowForm(false);
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card mt-5">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="card-title">Complaints Table</h3>
                  </div>
                  <div className="card-body">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setShowForm(true);
                        setShowEditForm(false);
                      }}
                    >
                      Add Complaint
                    </button>
                    <div className="table-responsive mt-2">
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th style={{ width: 10 }}>S.No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Created Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {complaints.map((complaint, index) => (
                            <tr key={complaint._id}>
                              <td>{index + 1}</td>
                              <td>{complaint.title.substring(0, 10)}...</td>
                              <td>
                                {complaint.description.substring(0, 10)}...
                              </td>
                              <td>
                                {new Date(
                                  complaint.createdDate
                                ).toLocaleDateString()}
                              </td>
                              <td>
                                <span className={"badge bg-danger"}>
                                  {complaint.status}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex justify-content-center">
                                  <Link
                                    to={`/complaints/${complaint._id}`}
                                    className="btn btn-primary btn-sm mr-1"
                                    style={{ width: 80 }}
                                  >
                                    View
                                  </Link>
                                  <button
                                    className="btn btn-success btn-sm mr-1"
                                    style={{ width: 80 }}
                                    onClick={() =>
                                      handleEditButtonClick(complaint)
                                    }
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    style={{ width: 80 }}
                                    onClick={() =>
                                      deleteComplaint(complaint._id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {showForm && <Form onSubmit={addComplaint} type={"Add"} />}
      {showEditForm && (
        <Form
          onSubmit={editComplaint}
          initialData={editComplaintData}
          type={"Edit"}
        />
      )}
    </>
  );
};

export default Complaints;
