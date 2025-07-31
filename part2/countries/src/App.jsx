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
  
  let countryListOutput
  if (filteredCountries.length > 10) {
    countryListOutput = <p>Too many matches, specify another filter</p>
  } else {
    countryListOutput = (
      <div>
        {filteredCountries.map(country => (
          <p key={country.cca3}>{country.name.common}</p>
        ))}
      </div> 
    )
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <form>
        find countries <input value={value} onChange={handleChange} />
      </form>
      {countryListOutput}
    </div>
  )
}

export default App