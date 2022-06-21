import React, { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import './ProjectForm.css'


function ProjectForm({ btnText, handleSubmit, projectData }) {

  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})

  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json'
      }
    })
      .then(resp => resp.json())
      .then(data => setCategories(data))
      .catch(console.log)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(e, project)
  }

  function handleChange(e) {
    const newProject = { ...project }
    newProject[e.target.name] = e.target.value
    setProject(newProject)
  }

  function handleCategory(e) {
    const newProject = { ...project }
    newProject.category = {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text
    }
    setProject(newProject)
  }

  return (
    <form onSubmit={submit} className="form">
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project?.name}
      />

      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project?.budget}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category?.id}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ProjectForm
