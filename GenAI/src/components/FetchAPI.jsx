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
  const [searchTerm, setSearchTerm] = useState('java');

  const { data, isLoading, error } = useQuery({
    queryKey: ['jobs', searchTerm],
    queryFn: () => getAPI(searchTerm),
  });



  const jobs = data?.jobs || [];

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>

      <h2>Find Remote Internships</h2>

      {isLoading && <Spinner />}
      {error && <div>Error: {error.message || 'Something went wrong'}</div>}

     <Internship jobs = {jobs} />
      
    </div>
  );
};

export default FetchAPI;
