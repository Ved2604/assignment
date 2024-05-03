import { useState, useEffect, useRef } from 'react';
import './App.css';
import { CircularProgress } from '@mui/material';
import JobCard from './JobCard';
import DropdownMenu from './Locationmenu';
import JobRoleDropdown from './Jobrolemenu';
import Paymenudropdown from './Paymenu';
import MinExpDropdown from './Expmenu'; 

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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement>(null); 
  const [selectedLocation, setSelectedLocation] = useState<string>(''); 
  const [selectedJobRole, setSelectedJobRole] = useState<string>("");
  const [selectedMinPay, setSelectedMinPay] = useState<number>(0);
  const [selectedMinExp, setSelectedMinExp] = useState<number>(0); // State for selected minimum experience
  
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

  useEffect(() => {
    setJobs([]); // Clear existing jobs
    setPage(1); // Reset page number
    
  }, [selectedLocation, selectedJobRole, selectedMinPay, selectedMinExp]);

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
      console.log(result);
  
      // Add a 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      let filteredJobs = result.jdList.filter((job: Job) => {
        let passLocation = selectedLocation ? job.location === selectedLocation : true;
        let passJobRole = selectedJobRole ? job.jobRole === selectedJobRole : true;
        let passMinPay = selectedMinPay ? job.minJdSalary >= selectedMinPay : true;
        let passMinExp = selectedMinExp ? job.minExp >= selectedMinExp : true;
  
        return passLocation && passJobRole && passMinPay && passMinExp;
      });
  
      setJobs((prevJobs) => [...prevJobs, ...filteredJobs]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  
  return ( 
    <> 
    <div className="bg-white shadow-md fixed top-0 left-0 w-full z-10 p-4 flex flex-wrap justify-between ">
        <DropdownMenu setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation} />
        <JobRoleDropdown selectedJobRole={selectedJobRole} setSelectedJobRole={setSelectedJobRole} />
        <Paymenudropdown selectedMinPay={selectedMinPay} setSelectedMinPay={setSelectedMinPay} />
        <MinExpDropdown selectedMinExp={selectedMinExp} setSelectedMinExp={setSelectedMinExp} />
      </div>
    <div className="container mx-auto px-4 mt-40 top-5">
       {jobs.length === 0 && !loading && <p className="text-center">No jobs match found with required filters.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mb-5">
            {jobs.map((job) => (
                <JobCard key={job.jdUid} job={job} />
            ))}
        </div>
        <div ref={loader} className="text-center">
            {loading && <CircularProgress />}
        </div>
    </div>
    </>
  );
}

export default App;
