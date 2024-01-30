import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Fetched } from "../../Apis/ApiFetcher";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const DetailsPage = () => {
  const [details, setDetails] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();
        setDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [name]);

  // useEffect(() => {
  //   document.title = `Countries | ${name}`;
  // }, [name]);

  return (
    <>
      <div className="container flex justify-center items-center ">
        <section className="p-8 md:py-0 max-w-7xl mx-auto">
          {details.map((item) => (
            <div
              key={item.population}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen"
            >
              <article>
                <img src={item.flags.svg} alt={item.name.common} />
              </article>
              <article>
                <h1 className="mb-6 font-bold text-gray-900 dark:text-white text-3xl lg:text-6xl">
                  {" "}
                  {item.name.official}
                </h1>
                <ul className="my-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-400">
                  <li>Capital: {item.capital[0]}</li>
                  <li>Population: {item.population.toLocaleString()}</li>
                  <li>Region: {item.region}</li>
                  <li>Subregion: {item.subregion}</li>
                </ul>
                {item.borders && (
                  <>
                    <h3 className="text-gray-900 font-bold text-lg mb-2 dark:text-white">
                      Borders:
                    </h3>
                    <ul className="flex flex-wrap items-start justify-start gap-2">
                      {item.borders.map((border, index) => (
                        <li
                          key={index}
                          className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-800 dark:text-gray-400 text-gray-700"
                        >
                          {border}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <Link
                  to="/"
                  className="inline-block mt-5 bg-white py-1 px-3 rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400"
                >
                  &larr; Back
                </Link>
              </article>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default DetailsPage;
