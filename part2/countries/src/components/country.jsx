const Country = ({result}) =>{
    
    return (
        <>
            <h2>{result.name.common}</h2>
                <p>Capital: {result.capital[0]}</p>              
                <p>Total area: {result.area}</p>
            <h3>Languages</h3>
                <ul>
                {Object.entries(result.languages).map(([key, value]) => (<li key = {key}>{value}</li>))}
                </ul>
            <img style={{width: 500}} src={result.flags.svg} alt={result.flags.alt} />
        </>
    )
}
export default Country