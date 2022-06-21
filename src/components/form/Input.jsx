import React from 'react'
import './Input.css'

function Input({type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        autoComplete="off"
      />
    </div>
  )
}

export default Input