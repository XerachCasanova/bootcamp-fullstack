const ListCountries = ({ countries, filter }) => {

    const handleShowCountry = (country, filter) => {

        filter = country
        console.log("probando", country, filter)
    }


    return (

        <ul>
            {countries.map(country => <li key={country.name}>{country.name} <button onClick={() => handleShowCountry(country.name, filter)} >show</button></li> )}
        </ul>

    )


}

export default ListCountries