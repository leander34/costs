import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import Company from './components/pages/Company'
import NewProject from './components/pages/NewProject'
import Projects from './components/pages/Projects'
import Project from './components/pages/Project'

export default function Router(props){
  return (
  <Routes>
    {/* posso passar propriedades para dentro dos componentes pela props ou não */}
    <Route path="/" element={<Home />} />
    <Route path="/company" element={<Company />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/newproject" element={<NewProject />} />
    <Route path='/projects' element={<Projects/>}/>
    <Route path='/project/:id' element={<Project/>}/>
    <Route path="*" element={<Home />} />
  </Routes>
  )
} 
