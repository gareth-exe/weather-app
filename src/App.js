import "./App.css";
import {useState, useEffect} from "react";
import axios from "axios";

function App(){

  const [search, setSearch] = useState(
    ""
  )

  const [allData, setAllData] = useState({
    city:"",
    country:"",
    temperature:"",
    humidity:"",
    minTemp:'',
    weatherIcon:""

  })

  useEffect(() => {
    fetchData()

  },[])

  const fetchData = async (city) => {

    try{
      const APIKEY = "2ca0429921c28bac953e647ade71e1ff"
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
  
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        humidity: result.data.main.humidity ,
        minTemp: result.data.main.temp_min ,
        weatherIcon: result.data.weather[0].icon
      })

    }catch(e){
      console.log(e)
    }

  }


  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(search)
    fetchData(search)
  
  }
  const handleChange = (event) => {
    setSearch(event.target.value)
  }


  return (
    <main>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input
          type="text"
          name="city"
          placeholder="Location"
          value={search}
          onChange={handleChange}
          />
          <button for="city">Search</button>
        </form>
        <section>
        <h1>{allData.city}</h1>
        <h2>{allData.country}</h2>
        <h2>Temperature</h2>
        <p>{Math.round(allData.temperature)}°C</p>
        <h2>Humidity</h2>
        <p>{allData.humidity}</p>
        <h2>Min temp</h2>
        <p>{allData.minTemp}</p>
        {console.log("test", allData.weatherIcon, allData.humidity)}
        <img src={"http://openweathermap.org/img/wn/"+ allData.weatherIcon + "@2x.png"} />

        </section>
      </div>
    </main>
  );


}


export default App;