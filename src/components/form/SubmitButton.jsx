import React from 'react'
import './SubmitButton.css'

function Submitbutton({ text }) {
  return (
    <div>
      <button className='btn'>{text}</button>
    </div>
  )
}

export default Submitbutton