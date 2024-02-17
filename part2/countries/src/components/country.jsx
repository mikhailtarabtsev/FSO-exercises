const Country = ({result}) =>{
    
    return (
        <>
            <h2>{result.name.common}</h2>
                <p>{result.capital[0]}</p>
                <p>{result.area}</p>
            <h3>Languages</h3>
                <ul>
                {Object.entries(result.languages).map(([key, value]) => (<li key = {key}>{value}</li>))}
                </ul>
            <p style={{
                fontSize:"10em",
                margin: 0}}>{result.flag}</p>
        </>
    )
}
export default Country