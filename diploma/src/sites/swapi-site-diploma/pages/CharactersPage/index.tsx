import { $ } from "@state-manager"
import axios from "axios"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import ImgPersonagem from '../../assets/stormtrooper.png'
import { count, map } from "rxjs"
import { CharacterCard } from "../../components/CharacterCard"
import { Character } from "../../types/Character"
import { Planet } from "../../types/Planet"

export const CharactersPage = () => {
  const page = $(1)
  const characters = $<Character[]>([])
  const charactersCount = $(0)
  const species = $([])
  const planets = $([])

  page.subscribe(async newPage => {
    const response = await axios.get(`https://swapi.dev/api/people/?page=${newPage}`)

    characters.next(response.data.results)
    charactersCount.next(response.data.count)

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
    const response = await axios.get(`https://swapi.dev/api/species/?page=${newPage}`)
    const newSpecies = response.data.results.map((s: any) => s.name)
    species.next(newSpecies)
  })

  page.subscribe(async newPage => {
    const response = await axios.get(`https://swapi.dev/api/planets/?page=${newPage}`)
    const newPlanets = response.data.results.map((p: Planet) => p.name)
    planets.next(newPlanets)
  })

  const handleNextPage = () => {
    page.next(page.getValue() + 1)
  }
  const handlePreviousPage = () => {
    page.next(page.getValue() - 1)
  }
  const k = $([1, 2, 3])
  const l = k.pipe(count())
  l.subscribe(q => console.log('test!!!', q))
  k.next([1,1,1])
  k.next([0,0,0])

  return <div id="main">
    <Header />

    <div className="count">
        <h1>TOTAL CHARACTERS: {charactersCount}</h1>
        <img src={ImgPersonagem} alt="Imagem Personagem" />
    </div>

    <div id="content">
      {characters.$(array => array.map(character => <CharacterCard {...character}/>))}
    </div>
    <div className="navigation-page">
      <button id="btnPrevious" onclick={handlePreviousPage}>PREVIOUS PAGE</button>
      <button id="btnNext" onclick={handleNextPage}>NEXT PAGE</button>
    </div>
    <Footer />
  </div>
}