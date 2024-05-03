import { useEffect, useState,useRef } from 'react'; 
import JobCard from './JobCard';
import { CircularProgress } from '@mui/material';  


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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement>(null);  

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '1px',
      threshold: 1.0,
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []); 

  useEffect(() => {
    fetchJobs();
    
  }, [page]); 

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  }; 

  const fetchJobs = async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        limit: 30,
        offset: (page - 1) * 10,
      }),
    };
  
    try {
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions);
      const result = await response.json();
      console.log(result)
  
      // Add a 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      
      
      setJobs((prevJobs) => [...prevJobs, ...result.jdList]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  

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
    <div className="">
        <div className="">
            {jobs.map((job) => (
                <JobCard key={job.jdUid} job={job} />
            ))}
        </div>
        <div ref={loader} className="text-center">
            {loading && <CircularProgress />}
        </div>
    </div>
  </div>;
}

export default App;
