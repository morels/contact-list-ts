import React, { useCallback, useState } from 'react';
import apiData, { Person } from './api';

type ContextType = {
  data: Person[],
  isLoading: boolean;
  error?: string | undefined;
  fetchPeople: () => Promise<void>;
}

const PersonContext = React.createContext<ContextType | null>(null);

const PersonProvider = ({children}:{children: React.ReactNode}) => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string|undefined>();

  const fetchPeople = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const people = await apiData();
      setData(old => [...old, ...people]);
    } catch (err) {
      console.log(err);
      setError("Error");
    } finally {
      setIsLoading(false);
    }
  },[]);

  const value = {
    data,
    isLoading,
    error,
    fetchPeople
  };

  return <PersonContext.Provider value={value}>
    {children}
  </PersonContext.Provider>;
};

const usePerson = () => {
  const context = React.useContext(PersonContext);
  if (!context)
    throw new Error("Cannot find PersonContext");
  return context;
};

export {
  PersonProvider,
  usePerson
};
