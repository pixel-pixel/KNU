import { $ } from '@state-manager'
import './styles.css'
import axios from 'axios'
import ImgPlanetas from '../../assets/planeta.png'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { PlanetCard } from '../../components/PlanetCard'

export const PlanetsPage = () => {
  const page = $(1)
  const planets = $<any>([])
  const planetsCount = $(0)
  const names = $([])

  page.subscribe(async newPage => {
    const response = await axios.get(`https://swapi.dev/api/planets/?page=${newPage}`);

    planets.next(response.data.results)
    planetsCount.next(response.data.count)

    const nextButton = document.getElementById('btnNext')
    response.data.next === null 
      ? nextButton && (nextButton.style.display = 'none')
      : nextButton && (nextButton.style.display = 'block')

    const prevButton = document.getElementById('btnPrevious')
    response.data.previous === null
      ? prevButton && (prevButton.style.display = 'none')
      : prevButton && (prevButton.style.display = 'block')
  })

  page.subscribe(async newPage => {
    const response = await axios.get(`https://swapi.dev/api/people/?page=${newPage}`)
    console.log('result', {resulr: response.data.results});
    
    const newNames = response.data.results.map((person: any) => person.name)
    names.next(newNames)
  })

  const handleNextPage = () => {
    page.next(page.getValue() + 1)
  }
  const handlePreviousPage = () => {
    page.next(page.getValue() - 1)
  }

  return <div id="main">
    <Header />

    <div className="count">
        <h1>TOTAL PLANETS: {planetsCount}</h1>
        <img src={ImgPlanetas} alt="Imagem Planeta" />
    </div>

    <div id="content">
        {planets.$(array => array.map(planet => <PlanetCard {...planet}/>))}
    </div>

    <div className="navigation-page">
        <button id="btnPrevious" onclick={handlePreviousPage}>PREVIOUS PAGE</button>

        <button id="btnNext" onclick={handleNextPage}>NEXT PAGE</button>
    </div>

    <Footer />
</div>
}