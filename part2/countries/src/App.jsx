import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from "./components/Weather";

const CountriesList = ({ filteredCountries, setSelectedCountry }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  return (
    <div>
      {filteredCountries.map(country => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </div>
      ))}
    </div>
  )
}

const CountryInfo = ({ country }) => {
  return(
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital.join(', ')}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="250" />
      <Weather capital={country.capital} capitalInfo={country.capitalInfo} />
    </div>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    if (countries) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
    }
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  )

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0])
    }
  }, [filteredCountries])  

  const handleChange = (event) => {
    setValue(event.target.value)
    setSelectedCountry(null)
  }

  return (
    <div>
      <form>
        find countries <input value={value} onChange={handleChange} />
      </form>
      {!selectedCountry && <CountriesList filteredCountries={filteredCountries} setSelectedCountry={setSelectedCountry} />}
      {selectedCountry && <CountryInfo country={selectedCountry} />}
    </div>
  )
}

export default App