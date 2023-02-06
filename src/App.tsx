import React, { useEffect, useRef, useState } from "react";
import apiData, { Person } from "./api";
import { Loader } from "./Loader";
import PersonInfo from "./PersonInfo";
import PersonInfoSkeleton from "./PersonInfo.skeleton";

function App() {
  const [data, setData] = React.useState<Person[]>([]);
  const [selected, setSelected] = React.useState<Record<Person['id'], boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [dummy, setDummy] = useState(0);
  const [loadLabel, setLoadLabel] = useState("Load more");
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
        setLoadLabel('Load more');
      } catch (err) {
        console.log(err);
        setLoadLabel('Retry');
      } finally {
        setIsLoading(false);
      }
    }
  
    void callback();
  }, [dummy]);
  
  useEffect(()=>{
    const sortBySelected = ({id: idA}:Person, {id: idB}:Person) =>+Boolean(selected[idB])  - +Boolean(selected[idA]);

    setData(oldData =>[...oldData].sort(sortBySelected));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selected]);

  const handleLoad = () => {
    setDummy(old => old+1);
  };

  const handleSelect = (id:Person['id']) => () => setSelected({...selected, [id]: selected[id] ? false : true });

  return (
    <>
      <main className="App">
        <section className="list">
          <div className="list-header">Selected contacts: {Object.values(selected).filter(Boolean).length}</div>
          <div className="list-content">
            {data.map((personInfo) => (
              <PersonInfo 
              key={personInfo.id}
              data={personInfo}
              onClick={handleSelect(personInfo.id)}
              selected={selected[personInfo.id]} 
              />
            ))}
            {!isLoading && <Loader className="loader" onClick={handleLoad} label={loadLabel} loading={isLoading}/>}
            {isLoading && <>
                <PersonInfoSkeleton />
                <PersonInfoSkeleton />
                <PersonInfoSkeleton />
              </>
            }
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
