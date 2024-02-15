const Filter =({search, handler})=> {
    
    return(
    <div>filter shown with: <input value={search}
                                   onChange={(event)=> handler("filter", event)} />
    </div>
    )
}

export default Filter
