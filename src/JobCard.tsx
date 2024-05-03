import React, { useState } from 'react';

interface JobCardProps {
  job: {
    jdUid: string;
    jobRole: string;
    location: string;
    jobDetailsFromCompany: string;
    minJdSalary: number;
    maxJdSalary: number;
    salaryCurrencyCode: string;
    minExp: number;
    jdLink: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <h2>{job.jobRole}</h2>
      <p>{job.location}</p>
      <p>
        {expanded ? job.jobDetailsFromCompany : `${job.jobDetailsFromCompany.slice(0, 40)}...`}
        <span onClick={toggleExpand} style={{ cursor: 'pointer', color: 'blue' }}>
          {expanded ? ' Read less' : ' Read more'}
        </span>
      </p>
      <p>
        {`${job.salaryCurrencyCode} ${job.minJdSalary} - ${job.salaryCurrencyCode} ${job.maxJdSalary}`}
      </p>
      <p>{`${job.minExp} years of experience required`}</p>
      <a href={job.jdLink}>Apply Here</a>
    </div>
  );
};

export default JobCard; 

