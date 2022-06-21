import React from 'react'
import '../project/ProjectCard.css'
import './ServiceCard.css'
import { BsFillTrashFill } from 'react-icons/bs'
function ServiceCard({ id, name, description, cost, handleRemove}) {
    function remove(e) {
        e.preventDefault()
        handleRemove(id, cost)
    }
  return (
    <div className='project_card'>
        <h4>{name}</h4>
        <p>
            <span>Custo total:</span> R${cost}
        </p>
        <p>{description}</p>
        <div className='project_card_actions'>
            <button onClick={remove} id='button'>
                <BsFillTrashFill /> Excluir
            </button>
        </div>
    </div>
  )
}

export default ServiceCard