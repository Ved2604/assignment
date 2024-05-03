import { useEffect, useState } from 'react'; 
import JobCard from './JobCard';

interface Job {
  jdUid: string;
  jobRole: string;
  location: string;
  jobDetailsFromCompany: string;
  minJdSalary: number;
  maxJdSalary: number;
  salaryCurrencyCode: string;
  minExp: number;
  jdLink:string;
}


function App() {
  const [jobs,setJobs]=useState<Job[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const body = JSON.stringify({
        limit: 10,
        offset: 0
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body
      };

      try {
        const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions);
        const result = await response.json();
        console.log(result);
        setJobs(result.jdList)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>
   {jobs.map((job) => (
                <JobCard key={job.jdUid} job={job} />
            ))}

  </div>;
}

export default App;
