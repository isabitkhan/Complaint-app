import React from "react";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "Description of Project 1.",
      link: "https://example.com/project1",
    },
    {
      id: 2,
      title: "Project 2",
      description: "Description of Project 2.",
      link: "https://example.com/project2",
    },
    {
      id: 3,
      title: "Project 3",
      description: "Description of Project 3.",
      link: "https://example.com/project3",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <h2 className="mt-5">Portfolio</h2>
          <div className="row">
            {projects.map((project) => (
              <div key={project.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">{project.description}</p>
                  </div>
                  <div className="card-footer">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
