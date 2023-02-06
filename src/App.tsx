import React, { useEffect, useState } from "react";
import { Person } from "./api";
import { Loader } from "./Loader";
import { usePerson } from "./Personcontext";
import PersonInfo from "./PersonInfo";
import PersonInfoSkeleton from "./PersonInfo.skeleton";

function App() {
  const [sortedData, setSortedData] = React.useState<Person[]>([]);
  const [selected, setSelected] = React.useState<Record<Person['id'], boolean>>({});
  const [loadLabel, setLoadLabel] = useState("Load more");
  const { data, fetchPeople, isLoading, error} = usePerson();
  
  const handleLoad = fetchPeople;

  useEffect(()=>{
    setLoadLabel(error ? 'Retry' : 'Load more');
  },[error]);
  
  useEffect(() => {
    void handleLoad();
  }, [handleLoad]);
  
  useEffect(() => {
    setSortedData(data);
  }, [data]);
  
  useEffect(()=>{
    const sortBySelected = ({id: idA}:Person, {id: idB}:Person) =>+Boolean(selected[idB])  - +Boolean(selected[idA]);

    setSortedData(oldData =>[...oldData].sort(sortBySelected));
  },[selected]);


  const handleSelect = (id:Person['id']) => () => setSelected({...selected, [id]: selected[id] ? false : true });

  return (
    <>
      <main className="App">
        <section className="list">
          <div className="list-header">Selected contacts: {Object.values(selected).filter(Boolean).length}</div>
          <div className="list-content">
            {sortedData.map((personInfo) => (
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
