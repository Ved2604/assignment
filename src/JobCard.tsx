import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

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
    jdLink:string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="mb-10 mr-5">
      <CardContent>
        <Typography variant="h5" component="h2" className="font-semibold">
          {job.jobRole}
        </Typography>
        <Typography color="textSecondary">
          {job.location}
        </Typography>
        <Typography variant="body2" component="p" className="mt-2">
          {expanded ? job.jobDetailsFromCompany : `${job.jobDetailsFromCompany.slice(0, 40)}...`}
          <span onClick={toggleExpand} style={{ cursor: 'pointer', color: 'blue' }}>
            {expanded ? ' Read less' : ' Read more'}
          </span>
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mt-2">
          {`${job.salaryCurrencyCode} ${job.minJdSalary} - ${job.salaryCurrencyCode} ${job.maxJdSalary}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mt-2">
          {`${job.minExp} years of experience required`}
        </Typography> 
        <Button href={job.jdLink} variant="contained" color="primary" size="small" style={{ marginTop: '10px' }} > Apply Here </Button>

      </CardContent>
    </Card>
  );
};

export default JobCard;
