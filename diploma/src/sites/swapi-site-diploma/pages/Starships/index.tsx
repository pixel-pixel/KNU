import axios from 'axios'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import ImgNaves from '../../assets/nave.png'
import './styles.css'
import { $ } from '@state-manager'
import { StarshipCard } from '../../components/StarshipCard'


export const Starships = () => {
    const page = $(1)
    const starships = $<any>([])
    const starshipsCount = $(0)
    const pilots = $([])

    page.subscribe(async newPage => {
      const response = await axios.get(`https://swapi.dev/api/starships/?page=${newPage}`)

      starships.next(response.data.results)
      starshipsCount.next(response.data.count)
      
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
      const newPilots = response.data.results.map((p: any) => p.name)
      pilots.next(newPilots)
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
        <h1>TOTAL STARSHIPS: {starshipsCount}</h1>
        <img src={ImgNaves} alt="Imagem Espaço-Nave" />
      </div>

      <div id="content">
          {starships.$(array => array.map(starship => <StarshipCard {...starship}/>))}
      </div>
      <div className="navigation-page">
        <button id="btnPrevious" onClick={handlePreviousPage}>PREVIOUS PAGE</button>

        <button id="btnNext" onClick={handleNextPage}>NEXT PAGE</button>
      </div>

      <Footer />
  </div>
}