
// Internship.jsx
import React from 'react';
import './Internship.css';

const Internship = ({ jobs }) => {
  if (!jobs || jobs.length === 0) return <div>No internships found.</div>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {jobs.map((job) => (
        <li key={job.id || job.job_id} className="internship-card">
          <div>
            <p><strong>{job.title}</strong></p>
            <p>{job.company_name}</p>
            <p>{job.category}</p>
            {job.tags && job.tags.length > 0 && (
              <p>
                <strong>Tags:</strong> {job.tags.join(', ')}
              </p>
            )}
            {job.job_type && (
              <p>
                <strong>Type:</strong> {job.job_type}
              </p>
            )}
            {job.publication_date && (
              <p>
                <strong>Published:</strong> {new Date(job.publication_date).toLocaleDateString()}
              </p>
            )}
            {job.candidate_required_location && (
              <p>
                <strong>Location:</strong> {job.candidate_required_location}
              </p>
            )}
            {job.salary && (
              <p>
                <strong>Salary:</strong> {job.salary}
              </p>
            )}
            <a href={job.url} target="_blank" rel="noopener noreferrer">View Job</a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Internship;

function Internship() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Internship Opportunities</h1>
      <p>Here you will see real-time internships based on your roadmap.</p>
    </div>
  )
}
export default Internship

