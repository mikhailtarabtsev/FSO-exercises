const Form = ({newName, newNumber, handler})=>{

    return(
        <form>
        <div>
          name: <input type="text" 
                value={newName}
                onChange={(event)=> handler("name", event)} />
        </div>
        <div>
          number: <input type="tel" 
                  value={newNumber}
                  onChange={(event)=> handler("phone", event)} />
        </div>
        <div>
          <button 
          onClick={(event)=> handler("submit", event)}
          type="submit">add</button>
        </div>
      </form>

    )
}
export default Form