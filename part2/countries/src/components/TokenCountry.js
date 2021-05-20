const TokenCountry = ({ country, weather }) => {
    return (

        <div>
        <h1>{country.name}</h1>
        capital {country.capital}
        <br />
        population {country.population}
        <h2>Languages</h2>
        <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img style={{ width: 120 }} alt='country flag' src={country.flag} />
        { weather !== undefined ? 
            <div>
                <h2>weather in {weather.location.name}</h2>
                <strong>temperature:</strong> {weather.current.temperature}
                <br />
                <img alt='weather icon' src={weather.current.weather_icons[0]} />
                <br />
                <strong>wind: </strong>{weather.current.wind_speed}
            </div>
            :
            <div>loading...</div>
        }   
    </div>

    )

}
        
        
    

export default TokenCountry