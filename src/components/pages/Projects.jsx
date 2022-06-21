import React, { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import Message from '../layout/Message'
import LinkButton from '../layout/LinkButton'
import Container from '../layout/Container'
import ProjectCard from '../project/ProjectCard'
import Loading from '../layout/Loading'
import './Projects.css'

function Projects() {

  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')
  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/projects', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
      .then(data => {
        setProjects(data)
        setRemoveLoading(true)
      })
      .catch(error => console.log(error))
    }, 300)
  }, [])

  async function handleRemove(id) {
    try {
      const response = await fetch(`http://localhost:5000/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const updatedProjects = projects.filter(project => project.id !== id)
      setProjects(updatedProjects)
      setProjectMessage('Projeto deletado com sucesso!')
    } catch (error) {
      console.log(error)
    }
  }


  const location = useLocation()
  let message = ''
  if(location.state) {
    message = location.state.message || ''
  }
  return (
    <div className='projects_container'>
      <div className='title_container'>
        <h1>Projetos</h1>
        <LinkButton to='/newproject' text='criar novo projeto'/>
      </div>
      {message && <Message msg={message} type='success'/>}
      {projectMessage && <Message msg={projectMessage} type='success'/>}
      
      <Container customClass='start'>
        {projects.length > 0 && 
        projects.map(project => (
          <ProjectCard 
          id={project.id}
          name={project.name}
          budget={project.budget}
          category={project.category.name}
          chave={project.id}
          handleRemove={handleRemove}
          />
        ))}
        {!removeLoading && <Loading/>}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados.</p>
        )}
      </Container>
    </div>
  )
}

export default Projects