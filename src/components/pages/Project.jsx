import React, { useState,  useEffect } from "react";
import {parse, v4 as uuidv4} from 'uuid'
import { useParams} from 'react-router-dom'
import './Project.css'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";


export default function Project() {
    const { id } = useParams()
    const [project, setProject] = useState({})
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
          .then(data => {
              setProject(data)
              setServices(data.services)
          }).catch(console.log)
        }, 300)
    }, [id])

    function editPost(e, project) {
        setMessage('')

        if(project.budget < project.cost) {
            setMessage('Custo maior que orçamento.')
            setType('error')
            return
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data => {
            setProject(data)
            setMessage('Projeto atualizado com sucesso!')
            setType('success')
        })
        .catch(console.log)
    }

    function createService(project) {
        setMessage('')

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost

        if(lastServiceCost < 0) {
            setMessage('Não é possivel adicionar um valor de serviço negativo')
            setType('error')
            project.services.pop()
            return
        }

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > project.budget) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço.')
            setType('error')
            project.services.pop()
            return
        }
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(resp => resp.json())
          .then(data => {
              setMessage('Serviço adicionado com sucesso!')
              setType('success')
              setProject(data)
          })
          .catch(console.log)
        setShowServiceForm(false)  

    }

    function handleRemove(id, cost) {
        const servicesUpdated = project.services.filter(service => service.id !== id)
        const projectUpdated = { ...project }
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then(resp => resp.json())
          .then(data => {
              setProject(projectUpdated)
              setServices(servicesUpdated)
              setMessage('Serviço removido com sucesso!')
           })
           .catch(console)


    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }


    return (
        <>
        {project.name ? (
            <div className="project_details">
                <Container customClass='column'>
                    {message && <Message type={type} msg={message} />}
                    <div className="details_container">
                        <h1>Projeto: {project.name}</h1>
                        <button className="btn" onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                        </button>

                        {!showProjectForm ? (
                            <div className="project_info">
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total utilizado:</span> R${project.cost}
                                </p>
                            </div> 
                        ) : (
                            <div className="project_info">
                                <ProjectForm btnText='Atualizar projeto' handleSubmit={editPost} projectData={project}/>
                            </div>
                        )}
                    </div>

                    <div className="service_form_container">
                        <h2>Adicione um serviço</h2>
                        <button className="btn" onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                        {showServiceForm && (
                            <div className="project_info">
                                <ServiceForm 
                                  handleSubmit={createService}
                                  btnText='Adicionar serviço'
                                  projectData={project}
                                />
                            </div>
                        )}

                    </div>
                    <h2>Serviços</h2>
                    <Container customClass='start'>
                        {services.length > 0 ? (
                            services.map(service => (
                                <ServiceCard 
                                id={service.id}
                                name={service.name}
                                description={service.description}
                                handleRemove={handleRemove}
                                key={service.id}
                                />
                            ))
                        ) : (
                            <p>Não existe serviços nesse projeto</p>
                        )}
                    </Container>
                </Container>
            </div>
        ) : <Loading />}
        </>
    )
}