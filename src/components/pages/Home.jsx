import React from 'react'
import './Home.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'

function Home(props) {
  return (
    <section className='home-container'>
      <h1>Bem-vindo ao <span>Costs</span></h1>
      <p>Comece a gerenciar os seus projetos agora mesmo!</p>
      <LinkButton to='/newproject' text='Criar projeto'/>
      <img src={savings} alt="Costs" />
    </section>
  )
}

export default Home