import { useEffect } from 'react';
import { useState } from 'react';
import './app.css';
import { FaSun,FaMapMarkerAlt,FaSnowflake,FaCloudRain,FaWater } from "react-icons/fa";






const App = () => {
  const [state, setState] = useState('Paradip');
  const[apiMain, setApiMain]= useState('');
  const[country, setCountry] = useState();
  const[dt, setDt] = useState();
  const[apiWeather, setApiWeather] = useState();
  const [icon, setIcon] = useState('');


  useEffect(() => {
    
    const fetchApi = async () => {
      const API_key = '8c049dd8c340e600cc5b74f2d37a27e4';
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state}&units=metric&appid=${API_key}`)
      const data = await res.json()
      console.log(data)
     setApiMain(data.main)
     setCountry(data.sys.country)
     setApiWeather(data.weather[0].description)
     }
     
     const localTime = new Date().toLocaleDateString();
    setDt(localTime);
    fetchApi() 

    eventHandle()
    
  }, [state])

  

console.log(apiWeather)
 
  const eventHandle = () => {

    switch (apiWeather) {
      case 'clouds':
        setIcon();
        break;
      case 'haze':
        setIcon(<FaWater/>);
        break;
      case 'rain':
        setIcon(<FaCloudRain/>);
        break;
      case 'clear sky':
        setIcon(<FaSun/>);
        break;
      case 'drizzle':
        setIcon();
        break;
      case 'light snow' || 'snow':
        setIcon(<FaSnowflake/>);
        break;
      case 'thunderstorm':
        setIcon();
        break;

      default:
        setIcon(<FaMapMarkerAlt/>);
    }
    
    
  }

 
  return (
    <>
      <div className="container">

          
        <div className="searchBar">
          <input type="text" name="" id="" value={state} onChange={(e) => setState(e.target.value)}  placeholder='Search by city or country' />
          <i className="fa-sharp fa-solid fa-magnifying-glass" ></i>
        </div>


        <div className="weatherBox">
          {!apiMain?<p style={{textAlign: 'center'}}>no data found</p> :(<> <div className="main">
            <div className="weather_condition">{icon}</div>
            <div className="location"> <h6>{state},{` ${country}`}</h6> <p>{dt}</p></div>
          </div>
          <div className="temperature">
            <h3>{apiMain.temp}</h3> <sup>o</sup><p>C</p>
          </div>
          <div className="sky_condition"><p>{apiWeather}</p></div>

          <div className="weather-details">
            <div className="visibility"><p>temp_min <h4>{` ${apiMain.temp_min}`}<sup>o</sup>c</h4></p> </div>
            <div className="feels_like"><p>temp_max <h4>{` ${apiMain.temp_max}`}<sup>o</sup>c</h4> </p></div>
            <div className="humidity"><p>Humidity<h4>{`${apiMain.humidity}`}%</h4></p></div>
            <div className="wind"><p>feels_like <h4>{` ${apiMain.feels_like}`}<sup>o</sup>c</h4>  </p></div>

          </div></>)}
         
        </div>

      </div>

    </>
  )
}

export default App;

