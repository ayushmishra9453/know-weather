import React, { useEffect, useState } from 'react';
import './css/style.css';

const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('Mumbai');

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url=`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=4d8787a7dd759641143714c9a45195cd`
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const resJson = await response.json();
        setCity(resJson.main);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setCity(null);
      }
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            value={search}
            className="inputField"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        {!city ? (
          <p className="errorMsg">No data found</p>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                <i className="fas fa-street-view"></i>
              </h2>
              <h3>{search}</h3>
              <h5 className="temp">{city.temp}°Cel</h5>
              <h5 className="tempmin_max">
                Min : {city.temp_min}°Cel | Max : {city.temp_max}°Cel
              </h5>
            </div>

            <div className="wave-one"></div>
            <div className="wave-two"></div>
            <div className="wave-three"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tempapp;
