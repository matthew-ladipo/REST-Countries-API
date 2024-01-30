import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Fetched } from "../../Apis/ApiFetcher";
import { Link } from "react-router-dom";

const MainPage = () => {
  const { data } = useContext(Fetched);
  const [searchText, setSearchText] = useState("");
  const [country, setCountry] = useState([]);

  const regions = [
    {
      name: "Europe",
    },
    {
      name: "Asia",
    },
    {
      name: "Africa",
    },
    {
      name: "Oceania",
    },
    {
      name: "Americas",
    },
    {
      name: "Antarctic",
    },
  ];


  async function searchCountry() {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchText}`
      );
      const data = await res.json();
      setCountry(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function filterByRegion(region) {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await res.json();
      setCountry(data);
    } catch (error) {
      console.error(error);
    }
  }

  function sumitHandler(e) {
    e.preventDefalt();
    filterByRegion();
  }
  function searchHandler(e) {
    e.preventDefalt();
    searchCountry();
  }

  useEffect(() => {
    document.title = `Showing All Countries`;
  }, []);


  // console.log(data);
  return (
    <>
      {!country ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <div className="flex container mx-auto mb-10">
            <form
              onSubmit={searchHandler}
              autoComplete="off"
              className="max-w-4xl md:flex-1"
            >
              <i className="fa fa-search my-auto -mr-9 z-10 pr-2 pl-3 py-5 rounded-md text-gray-400"></i>
              <input
                type="text"
                placeholder="Search for a country..."
                name="search"
                id="search"
                required
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-7 p-2 my-5 mx-12 shadow-md rounded-md w-1/4 dark:bg-gray-700"
              />
            </form>
            <form onSubmit={sumitHandler}>
              <select
                name="filter-by-region"
                id="filter-by-region"
                className="w-52 py-2 px-4 mt-5~ outline-none shadow rounded text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700"
                value={regions.name}
                onChange={(e) => filterByRegion(e.target.value)}
              >
                {regions.map((region, index) => (
                  <option key={index} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="container mx-auto  ">
            <div className="  grid grid-cols-4 gap-14 ml-8 ">
              {data?.map((items, index) => (
                <p key={items}>
                  <Link to={`/details/${items.name.common}`}>
                    <div className="shadow-md dark:bg-slate-500 rounded-md w-full h-full  text-sm font-light overflow-hidden ">
                      <img src={items.flags.svg} alt="" className="w-full" />
                      <div className="py-1 px-5">
                        <h6>
                          <b>NAME :</b>
                          {items.name.common}
                        </h6>
                        <h6>
                          <b>REGION :</b>
                          {items.continents[0]}
                        </h6>
                        <h6>
                          <b>TOTAL POP :</b>
                          {items.population}
                          <b>M</b>
                        </h6>
                      </div>
                    </div>
                  </Link>
                </p>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default MainPage;
