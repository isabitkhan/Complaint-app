import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must contain at least 3 characters." }),
  description: z
    .string()
    .min(5, { message: "Description must contain at least 5 characters." }),
  createdDate: z.string().refine(
    (value) => {
      return !isNaN(Date.parse(value));
    },
    { message: "Invalid date." }
  ),
  // status: z.string(), // Add status validation
});

const Form = ({ onSubmit, type, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...initialData,
      createdDate: initialData?.createdDate
        ? new Date(initialData.createdDate).toISOString().substr(0, 10)
        : new Date().toISOString().substr(0, 10), // Format timestamp to date string
      status: initialData?.status || "Pending", // Default status
    },
  });

  useEffect(() => {
    if (initialData) {
      // Set initial data values
      for (const [key, value] of Object.entries(initialData)) {
        setValue(
          key,
          key === "createdDate"
            ? new Date(value).toISOString().substr(0, 10)
            : value
        );
      }
    }
  }, [initialData, setValue]);

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid col-md-6">
          <form
            id="quickForm"
            onSubmit={handleSubmit((data) => {
              onSubmit({ ...data, _id: initialData?._id }); // Preserve the _id for edit
              console.log(data);
              reset();
            })}
          >
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  {...register("title")}
                  type="text"
                  name="title"
                  className="form-control"
                  autoFocus
                  placeholder="Enter Title"
                />
                {errors.title && (
                  <p className="text-danger">{errors.title.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  {...register("description")}
                  className="form-control"
                  rows="3"
                  placeholder="Enter ..."
                />
                {errors.description && (
                  <p className="text-danger">{errors.description.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="createdDate">Date</label>
                <input
                  {...register("createdDate")}
                  type="date"
                  name="createdDate"
                  className="form-control"
                />
                {errors.createdDate && (
                  <p className="text-danger">{errors.createdDate.message}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  {...register("status")}
                  name="status"
                  className="form-control"
                >
                  <option value="Open">Open</option>
                  <option value="Close">Close</option>
                  <option value="In Progress">In Progress</option>
                </select>
                {/* {errors.status && (
                  <p className="text-danger">{errors.status.message}</p>
                )} */}
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                {type}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Form;
