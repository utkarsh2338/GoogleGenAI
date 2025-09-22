import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getAPI } from './API';
import Internship from './Internship';

const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
    <div className="loader"></div>
    <style>{`
      .loader {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const FetchAPI = () => {
  const [searchTerm, setSearchTerm] = useState('react');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['jobs', searchTerm],
    queryFn: () => getAPI(searchTerm),
   staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    retry: 2 // Retry failed requests twice
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const jobs = data?.jobs || [];
console.log(jobs);
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h2>Find Remote Internships</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for jobs..."
            style={{
              flex: 1,
              padding: '0.5rem',
              fontSize: '1rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              backgroundColor: '#3498db',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: '#ffebee',
          border: '1px solid #ffcdd2',
          borderRadius: '4px',
          color: '#c62828'
        }}>
          Error: {error.message || 'Something went wrong'}
        </div>
      )}

      {isLoading && <Spinner />}

      {!isLoading && !error && jobs.length === 0 && (
        <p>No jobs found for "{searchTerm}". Try a different search term.</p>
      )}

      <Internship jobs={jobs} />

    </div>
  );
};

export default FetchAPI;