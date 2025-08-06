import { useState, useEffect } from "react"
import axios from "axios"

const api_key = import.meta.env.VITE_SOME_KEY

const Weather = ({ capital, capitalInfo }) => {
	const [weatherData, setWeatherData] = useState(null)

	let capital_longitude = capitalInfo.latlng[1]
	let capital_latitude = capitalInfo.latlng[0]
	useEffect(() => {
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${capital_latitude}&lon=${capital_longitude}&appid=${api_key}&units=metric`
		axios
            .get(url)
            .then(response => {
              console.log(response.data)
              setWeatherData(response.data)
		})
	}, [])

    if (!weatherData) {
        return <p>Loading weather data...</p>
      }

	return (
		<>
			<h2>Weather in {capital[0]}:</h2>
			<p>Temperature: {weatherData.main.temp} Celcius</p>
			<img
				src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
				alt="weather icon"
			/>
			<p>Wind: {weatherData.wind.speed} m/s</p>
		</>
	)
}

export default Weather