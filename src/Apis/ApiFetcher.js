import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const Fetched = React.createContext(null);

const ApiFetcher = ({ children }) => {
  const [theme, setTheme] = useState();
  const [url, setUrl] = useState("https://restcountries.com/v3.1/all");

  const fetchConutires = async () => {
    const { data } = await axios.get(url);
    return data;
  };
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["Country"],
    queryFn: fetchConutires,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  function handleMode() {
    setTheme(theme === "dark" ? "gray" : "dark");
  }
  return (
    <div >
      <Fetched.Provider value={{data}}>
        <div className="shadow-xl   py-4 bg-white dark:bg-slate-700 ">
          <div className="mx-6 flex justify-between  ">
          <h3> Where in The World</h3>
          <button onClick={handleMode}>Dark Mode</button>
          </div>
        </div>
        {children}
      </Fetched.Provider>
    </div>
  );
};

export default ApiFetcher;
