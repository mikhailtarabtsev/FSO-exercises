import Country from "./country"

const Display = ({result}) => {

    if (result.length===1){
        return(
            <Country result={result[0]}/>
        )
    }
    else if(result.length <= 10){
        return(
            <ul>{result.map(
                (country) => <li key={country.name.official}>{country.name.common}</li>
                
                )}</ul>)
    }

    return (
        <>
        <p>Too many results, please make query more specific</p>
        </>
    )




   
}
export default Display