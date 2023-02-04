import React, { useEffect, useRef, useState } from "react";
import apiData, { Person } from "./api";
import PersonInfo from "./PersonInfo";

function App() {
  const [data, setData] = React.useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);


   useEffect(() => {
    async function callback() {
      setIsLoading(true);
      try {
        const people = await apiData();
        // The result may be received when the component is unmounted
        // To prevent State editing, check if it is mounted first
        if (!isMounted.current) return;
        setData(old => [...old, ...people]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  
    void callback();
  }, []);

  return (
    <main className="App">
      <aside className="selected">Selected contacts: 0</aside>
      <section className="list">
        {data.map((personInfo) => (
            <PersonInfo key={personInfo.id} data={personInfo} />
          )
        )}
      {isLoading && <div className="loading">Loading...</div>}
      </section>
    </main>
  );
}

export default App;
