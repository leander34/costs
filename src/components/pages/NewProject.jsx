import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import './NewProject.css'

function NewProject(pros) {
  const navigate = useNavigate()
  function createPost(project) {
    // initialize cost and services
    project.cost = 0
    project.services = []


    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        navigate('/projects', { state: {message: 'Projeto criado com sucesso!'}})
      })
      .catch(console.log)
  }

  return (
    <div className="newProject-container">
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={(e, project) => createPost(project)} btnText="Criar projeto" />
    </div>
  )
}

export default NewProject
