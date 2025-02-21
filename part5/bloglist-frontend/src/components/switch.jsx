import { useImperativeHandle } from 'react'
import { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'

const Switch = forwardRef((props, refs) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {setVisible(!visible)}

  const hiddenWhenVisible = { display : visible ?'none' :'' }
  const shownWhenVisible = { display : visible ?'' :'none' }

  useImperativeHandle(refs, () => {
    return{
      toggleVisibility
    }
  })


  return (
    <div>
      <div style = {hiddenWhenVisible}>
        <button onClick={toggleVisibility}>{props.label}</button>
      </div>
      <div style = {shownWhenVisible}>
        {props.children}
        <button onClick = {toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})
Switch.displayName ='Switch'
Switch.propTypes = {  label : PropTypes.string.isRequired
}
export default Switch