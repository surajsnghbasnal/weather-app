import React, { useEffect, useState } from 'react'
import './index.css'

import thunder from './assets/thunder.webp'
import sun from './assets/sun.webp'
import tornado from './assets/Tornado.webp'
import rain from './assets/rain_with_cloud.webp'

const App = () => {
    const [city, setCity] = useState('Delhi')
    const [weatherData, setWeatherData] = useState(null)


    const currentDate = new Date();
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formatedDate = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`

    const API_KEY = '2d4f654767205817e047721c39003c13'

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            const data = await response.json()
            console.log(data);
            setWeatherData(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleInputChange = (e) => {
        setCity(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        fetchData()
    }
    useEffect(() => {
        fetchData()
    }, [])




    return (
        <div className="App">
            <div className="container">
                {weatherData && (
                    <>
                        <h1 className="container_date">{formatedDate}</h1>
                        <div className="weather_data">
                            <h2 className="container_city">{weatherData.name}</h2>
                            <img
                                className="container_img"
                                src={weatherData.weather[0].main == 'Clouds' ? thunder : weatherData.weather[0].main == 'Rain' ? rain : weatherData.weather[0].main == 'Mist' ? tornado : weatherData.weather[0].main == 'Haze' ? sun : weatherData.weather[0].main == 'Clear' ? sun : null}
                                width='180px'
                                alt="Weather Icon"
                            />

                            <h2 className="container_degree">{Math.floor(weatherData.main.temp - 273.15)}</h2>
                            <h2 className="country_per">{weatherData.weather[0].main}</h2>

                            <form className="form" onSubmit={submitHandler}>
                                <input type="text" className="input" placeholder='Enter city name' onChange={handleInputChange} />
                                <button className='btn' type='submit'>Get</button>
                            </form>
                        </div>
                    </>
                )}



            </div>
        </div>
    )
}

export default App
