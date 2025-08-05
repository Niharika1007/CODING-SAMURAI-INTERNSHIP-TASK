import React from 'react';

function Projects() {
  const myProjects = [
    {
      title: "To-Do App",
      image: "/project1.png",
      description: "Add, complete, and delete tasks with local state.",
    },
    {
      title: "Landing Page",
      image: "/project1.png",
      description: "Simple responsive page built with HTML, CSS.",
    },
  ];

  return (
    <section>
      <h2>Projects</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {myProjects.map((proj, i) => (
          <div key={i} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", width: "300px" }}>
            <img src={proj.image} alt={proj.title} width="100%" />
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
