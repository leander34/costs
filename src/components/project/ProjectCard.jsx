import React from "react";
import './ProjectCard.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { Link } from "react-router-dom";

export default function ProjectCard({ id, name, budget, category, handleRemove, chave }) {
    return (
        <div className="project_card">
            <h4>{name}</h4>
            <p>
                <span>Orcamento:</span> R$:{budget}
            </p>
            <p className="category_text">
                <span className={category.toLowerCase()}></span> {category}
            </p>

            <div className="project_card_actions">
                <Link to={`/project/${id}`}>
                  <BsPencil/> Editar
                </Link>
                <button onClick={(e) => handleRemove(id)}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}