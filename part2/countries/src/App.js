import { useState, useEffect } from 'react'
import Field from './components/Field'
import TokenCountry from './components/TokenCountry'
import axios from 'axios'
const App = () => {
    
    const [countries, setCountries] =useState([])
    const [findCountries, setFindCountries] = useState('')
    const [listCountries, setListCountries] = useState([])
    const [countryFound, setCountryFound] = useState(false)
    const [weather, setWeather] = useState()

    
    const api_key = process.env.REACT_APP_APY_KEY

    const hookCountries = () => {
        axios
            .get(`https://restcountries.eu/rest/v2/all`)      
                
            .then(response => {
                setCountries(response.data)
            })
    }

    const hookWeather = () => {

        if (countryFound) {

            axios
            .get('http://api.weatherstack.com/current',  
                { params: 
                    { 
                        access_key: api_key,
                        query: listCountries[0].name
                    } 
                })
            .then(response => {
                setWeather(response.data)
            })
            
        }

    }

    useEffect(hookCountries, [])
    useEffect(hookWeather,[countryFound])
    


    const handleFindCountries = (event) => {
        
        setFindCountries(event.target.value)
        
        let newListCountries = []

            newListCountries = countries.filter(country => country.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
            
            setListCountries(newListCountries)
            
            setCountryFound(newListCountries.length === 1)

            if (!countryFound) setWeather(undefined)
    
    }

    const handleClickCountry = (country) => {
        setListCountries([country])
        setCountryFound(true)

    }
 
    
    return (
        
        <div>
            <Field label='find countries' value={findCountries} handle={handleFindCountries} />
            {listCountries.length === 1 ?
                <TokenCountry country = {listCountries[0]} weather={weather} />
                :
                findCountries.trim() != '' ?
                listCountries.length > 10 ?
                    <p>Too many matches, specify another filter</p>
                    :
                    
                    <ul>
                        {listCountries.map(country => <li key={country.name}>{country.name} <button onClick={()=> handleClickCountry(country)}>show</button></li> )}
                    </ul>
                :
                <p>Type a country</p>
            }
        </div>

    )

    

}


export default App