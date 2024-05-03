import { useEffect } from 'react';

function App() {
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>Setting up application</div>;
}

export default App;
