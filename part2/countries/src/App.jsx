import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (countries) {
      console.log('fetching countries...')
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
  
  const CountryListOutput = ({ filteredCountries }) => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      return(
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital {country.capital.join(', ')}</p>
          <p>Area {country.area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(country.languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="250" />
        </div>
      )
    }
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else {
      return (
        <div>
          {filteredCountries.map(country => (
            <p key={country.cca3}>{country.name.common}</p>
          ))}
        </div> 
      )
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <form>
        find countries <input value={value} onChange={handleChange} />
      </form>
      <CountryListOutput filteredCountries = {filteredCountries} />
    </div>
  )
}

export default App