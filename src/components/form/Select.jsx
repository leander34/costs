import React from 'react'
import './Select.css'

function Select({ text, name, options, handleOnChange, value }) {
  function renderOption(options) {
    return options.map(option => {
      return (
        <option value={option.id} key={option.id}>{option.name}</option>
      )
    })
  }
  return (
    <div className="form-control">
      <label htmlFor={name}>{text}</label>
      <select onChange={handleOnChange} name={name} id={name} value={value}>
        <option>Selecione uma opção</option>
        {renderOption(options)}
      </select>
    </div>
  )
}

export default Select