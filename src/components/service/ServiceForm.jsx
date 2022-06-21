import React, { useState } from "react";
import '../project/ProjectForm.css'
import Input from "../form/Input";
import SubmitButton from '../form/SubmitButton'

export default function ServiceForm({ btnText, projectData, handleSubmit }) {
    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        const updatedProject = { ...projectData }
        updatedProject.services.push(service)
        handleSubmit(updatedProject)
    }

    function handleChange(e) {
        const updatedService = { ...service }
        updatedService[e.target.name] = e.target.value
        setService(updatedService)
    }

    return (
        <form onSubmit={submit} className='form'>
            <Input type='text' name='name' text='Nome do serviço' placeholder='Insira o nome do serviço' handleOnChange={handleChange}/>
            <Input type='number' name='cost' text='Custo do serviço' placeholder='Insira o valor total' handleOnChange={handleChange}/>
            <Input type='text' name='description' text='Descrição do serviço' placeholder='Descreva o serviço' handleOnChange={handleChange}/>
            <SubmitButton text={btnText}/>
        </form>
    )
}